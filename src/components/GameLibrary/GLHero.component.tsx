import { GamesPageData } from '@/app/actions/services/getGamePageData.service'

export default async function GLHeroComponent({
	data,
}: Readonly<{
	data: GamesPageData
}>) {
	return (
		<div className={'relative'}>
			<div>
				{/* Hero section text container */}
				<div className='absolute left-1/2 top-[45vh] z-30 flex w-1/2 -translate-x-1/2 -translate-y-1/2 transform flex-col items-center gap-12'>
					{/* Hero title */}
					<h1 className='font-cardinal text-8xl text-customBrown-100 opacity-100 first-letter:text-customRed-100 max-sm:text-7xl'>
						{data.games_hero_title}
					</h1>
					{/* Hero description with HTML content */}
					<div
						className='text-center font-obraletra text-xl text-customBrown-100 max-sm:text-sm'
						dangerouslySetInnerHTML={{
							__html: data.games_hero_description,
						}}
					></div>
				</div>
				{/* Background image with opacity */}
				<div className='mask-custom h-[115vh] min-h-[115vh] w-[100vw] bg-menu-background-image bg-cover bg-center opacity-75' />
			</div>
		</div>
	)
}
