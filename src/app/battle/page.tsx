import ScoreCounterComponent from '@/components/CocktailBattle/Counter.component'
import { getCocktailBattleData } from '@/app/actions/services/getCocktailBattlePageData.service'
import { getNavBarData } from '@/app/actions/services/getNavData.service'
import Navbar from '@/components/Global/Navbar.component'
import MobileNavbar from '@/components/Global/NavbarMobile.component'
import CocktailVersusComponent from '@/components/CocktailBattle/CocktailVersus.component'

export default async function Page() {
	const navItems = await getNavBarData()
	const BattleData = await getCocktailBattleData()
	const Cocktail1score = BattleData.cocktail1_score
	const Cocktail2score = BattleData.cocktail2_score

	return (
		BattleData && (
			<div>
				<Navbar navItems={navItems} />
				<MobileNavbar navItems={navItems} />

				<div className='mask-custom absolute bottom-0 left-0 h-[125vh] w-full -translate-y-[70vh] transform bg-background-image opacity-75'></div>

				<div className='flex w-full flex-col mt-64'>
					<CocktailVersusComponent data={BattleData} />

					<div className='flex w-full gap-4 px-20'>
						<div className='flex w-1/2 items-center justify-between'>
							<ScoreCounterComponent data={Cocktail1score} />
						</div>
						<div className='flex w-1/2 items-center justify-between'>
							<ScoreCounterComponent data={Cocktail2score} />
						</div>
					</div>
				</div>
			</div>
		)
	)
}
