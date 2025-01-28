import { getGameLibraryPageData } from '@/app/actions/getDatasService'

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
				<div className='absolute left-1/2 top-[40%] z-30 flex w-1/2 -translate-x-1/2 -translate-y-1/2 transform flex-col items-center gap-12'>
					{/* Hero title */}
					<h1 className='font-cardinal text-8xl text-title-200 opacity-100 first-letter:text-title-100 max-sm:text-7xl'>
						{GameLibraryData.games_hero_title}
					</h1>
					{/* Hero description with HTML content */}
					<div
						className='text-center font-obraletra text-xl text-title-200 max-sm:text-sm'
						dangerouslySetInnerHTML={{
							__html: GameLibraryData.games_hero_description,
						}}
					></div>
				</div>
				{/* Background image with opacity */}
				<div className='mask-custom h-[115vh] min-h-[115vh] w-[100vw] bg-menuBGImage bg-cover bg-center opacity-75' />
			</div>
		</div>
	)
}
