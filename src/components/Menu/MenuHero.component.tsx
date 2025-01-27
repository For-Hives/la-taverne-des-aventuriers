import { getMenuPageData } from '@/app/actions/getDatasService'

export default async function MenuHeroComponent() {
	const data = await getMenuPageData()
	const MenuData = {
		menu_hero_description: data.menu_hero_description,
		menu_hero_title: data.menu_hero_title,
	}

	return (
		<div className={'relative'}>
			<div>
				<div className='absolute left-1/2 top-[40%] z-30 flex w-1/2 -translate-x-1/2 -translate-y-1/2 transform flex-col items-center gap-12'>
					<h1 className='font-cardinal text-8xl text-title-200 opacity-100 first-letter:text-title-100 max-sm:text-7xl'>
						{MenuData.menu_hero_title}
					</h1>

					<div
						className='text-center font-obraletra text-xl text-title-200 max-sm:text-sm'
						dangerouslySetInnerHTML={{
							__html: MenuData.menu_hero_description,
						}}
					></div>
				</div>
				<div className='mask-custom h-[115vh] min-h-[115vh] w-[100vw] bg-menuBGImage bg-cover bg-center opacity-75' />
			</div>
		</div>
	)
}
