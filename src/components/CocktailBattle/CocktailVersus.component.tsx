import { CocktailBattleData } from '@/app/actions/services/getCocktailBattlePageData.service'
import ScoreCounterComponent from '@/components/CocktailBattle/Counter.component'
import Image from 'next/image'

export default function CocktailVersusComponent({
	data,
}: Readonly<{
	data: CocktailBattleData
}>) {
	const Cocktail1score = data.cocktail1_score
	const Cocktail2score = data.cocktail2_score

	return (
		<div className='flex h-fit w-full flex-col items-center justify-center gap-12 px-20 font-cardoRegular text-lg text-customBrown-100 max-md:px-2'>
			<h1 className='font-cardinal text-9xl first-letter:text-customRed-100 max-md:text-5xl'>
				Battle De Cocktails !
			</h1>

			<div className='flex h-fit w-full items-center justify-center gap-12 px-20 font-cardoRegular text-lg text-customBrown-100 max-xl:flex-col max-xl:px-2'>
				{/* Column 1 */}
				<div className='relative flex h-fit min-h-screen w-1/2 flex-col items-center justify-center gap-9 max-xl:w-full max-xl:gap-20'>
					<div className='items_center relative flex h-full min-h-screen w-full flex-col justify-end'>
						{/* Image */}
						<div className='absolute inset-0 z-0'>
							<Image
								src={data.cocktail_1_image}
								alt={data.cocktail1_title}
								fill
								className='object-cover max-md:w-1/2'
							/>
						</div>

						{/* Text */}
						<div className='relative z-10 flex min-h-[25vh] w-full flex-col justify-center gap-9 rounded bg-black/30 px-4'>
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

					<div className='flex w-full flex-col items-center justify-center gap-6'>
						<h2 className='font-cardinal text-3xl first-letter:text-customRed-100'>
							{data.cocktail1_score}
						</h2>

						{/* Score Counter*/}
						<div className='relative z-10 mt-4 flex h-fit w-full justify-center'>
							<ScoreCounterComponent data={Cocktail1score} />
						</div>
					</div>
				</div>

				{/* Column 1 */}
				<div className='relative flex h-fit min-h-screen w-1/2 flex-col items-center justify-center gap-9 max-xl:w-full max-xl:gap-20'>
					<div className='items_center relative flex h-full min-h-screen w-full flex-col justify-end'>
						{/* Image */}
						<div className='absolute inset-0 z-0'>
							<Image
								src={data.cocktail_2_image}
								alt={data.cocktail2_title}
								fill
								className='object-cover max-md:w-1/2'
							/>
						</div>

						{/* Text */}
						<div className='relative z-10 flex min-h-[25vh] w-full flex-col justify-center gap-9 rounded bg-black/30 px-4'>
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

					<div className='flex w-full flex-col items-center justify-center gap-6'>
						<h2 className='font-cardinal text-3xl first-letter:text-customRed-100'>
							{data.cocktail2_score}
						</h2>

						{/* Score Counter*/}
						<div className='relative z-10 mt-4 flex h-fit w-full justify-center'>
							<ScoreCounterComponent data={Cocktail2score} />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
