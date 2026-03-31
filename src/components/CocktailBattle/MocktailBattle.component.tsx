import type { MocktailBattleData } from '@/app/actions/services/getMocktailBattlePageData.service'
import ButtonBattleCocktailsComponent from '@/components/CocktailBattle/ButtonBattleCocktails.component'
import ChainWinCounter from '@/components/CocktailBattle/ChainWinCounter'
import { CocktailCard } from '@/components/CocktailBattle/CocktailCard'
import { ScoreCounter } from '@/components/CocktailBattle/ScoreCounter'

export default function MocktailBattleComponent({
	data,
}: Readonly<{
	data: MocktailBattleData
}>) {
	return (
		<div className="container mx-auto max-w-6xl px-4 pb-12 lg:pb-36">
			<h1 className="font-cardinal text-custom-brown-100 first-letter:text-custom-red-100 mb-16 text-center text-8xl max-md:text-5xl">
				Bataille de Mocktails
			</h1>

			<ButtonBattleCocktailsComponent />

			<div
				className={'prose prose-customBrown mx-auto mb-24 max-w-6xl text-center'}
				dangerouslySetInnerHTML={{ __html: data.explanation }}
			/>

			{data.chain_win_score > 0 && (
				<div className="mb-10 w-full text-center">
					<ChainWinCounter label={data.chain_win_label} score={data.chain_win_score} color="customRed-100" />
				</div>
			)}

			<div className="relative flex w-full flex-col items-start gap-8 lg:flex-row lg:gap-16">
				<div className="flex w-full flex-col items-center gap-8 lg:w-6/12">
					<div className="relative flex w-full items-center justify-center">
						<CocktailCard
							title={data.mocktail1_title}
							description={data.mocktail1_description}
							image={data.mocktail_1_image}
							stars={data.mocktail1_stars}
							inverted={true}
						/>
					</div>

					<div className="w-full">
						<ScoreCounter data={data.mocktail1_score} title={data.mocktail1_title} color="customRed-100" />
					</div>
				</div>

				<div className="z-20 my-4 flex w-full justify-center lg:hidden">
					<div className="relative">
						<div className="absolute -inset-8 rounded-full" />
						<span className="font-cardinal text-custom-brown-100 relative text-7xl font-bold drop-shadow-lg">VS</span>
					</div>
				</div>

				<div className="flex w-full flex-col items-center gap-8 lg:w-6/12">
					<div className="relative flex w-full items-center justify-center">
						<CocktailCard
							title={data.mocktail2_title}
							description={data.mocktail2_description}
							image={data.mocktail_2_image}
							stars={data.mocktail2_stars}
						/>
					</div>

					<div className="w-full">
						<ScoreCounter data={data.mocktail2_score} title={data.mocktail2_title} color="customBrown-100" />
					</div>
				</div>
			</div>
		</div>
	)
}
