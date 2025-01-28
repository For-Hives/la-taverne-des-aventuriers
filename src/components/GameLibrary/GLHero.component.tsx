import { getGameLibraryPageData } from '@/app/actions/services/getGamePageData.service'

export default async function GLHeroComponent() {
	// Fetch the data for the game library hero section
	const data = await getGameLibraryPageData()

	// Structure the fetched data
	const GameLibraryData = {
		games_hero_description: data.games_hero_description,
		games_hero_title: data.games_hero_title,
	}

	return (
		<div className={'relative'}>
			<div>
				{/* Hero section text container */}
				<div className='absolute left-1/2 top-[45vh] z-30 flex w-1/2 -translate-x-1/2 -translate-y-1/2 transform flex-col items-center gap-12'>
					{/* Hero title */}
					<h1 className='text-customBrown-100 first-letter:text-customRed-100 font-cardinal text-8xl opacity-100 max-sm:text-7xl'>
						{GameLibraryData.games_hero_title}
					</h1>
					{/* Hero description with HTML content */}
					<div
						className='text-customBrown-100 text-center font-obraletra text-xl max-sm:text-sm'
						dangerouslySetInnerHTML={{
							__html: GameLibraryData.games_hero_description,
						}}
					></div>
				</div>
				{/* Background image with opacity */}
				<div className='mask-custom bg-menu-background-image h-[115vh] min-h-[115vh] w-[100vw] bg-cover bg-center opacity-75' />
			</div>
		</div>
	)
}
