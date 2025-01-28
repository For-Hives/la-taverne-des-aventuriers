import { getMenuPageData } from '@/app/actions/services/getMenuData.service' // Import the function to get menu page data

// The MenuHeroComponent component
export default async function MenuHeroComponent() {
	// Fetching the data for the menu hero section
	const data = await getMenuPageData()

	// Mapping the fetched data into a more accessible format
	const MenuData = {
		menu_hero_description: data.menu_hero_description, // The description of the menu hero section
		menu_hero_title: data.menu_hero_title, // The title of the menu hero section
	}

	return (
		<div className={'relative'}>
			{' '}
			{/* Container for the hero section */}
			<div>
				{/* Hero text content */}
				<div className='absolute left-1/2 top-[45vh] z-30 flex w-1/2 -translate-x-1/2 -translate-y-1/2 transform flex-col items-center gap-12'>
					{/* Hero title */}
					<h1 className='text-customBrown-100 first-letter:text-customRed-100 font-cardinal text-8xl opacity-100 max-sm:text-7xl'>
						{MenuData.menu_hero_title} {/* Displaying the menu hero title */}
					</h1>

					{/* Hero description */}
					<div
						className='text-customBrown-100 text-center font-obraletra text-xl max-sm:text-sm'
						dangerouslySetInnerHTML={{
							__html: MenuData.menu_hero_description, // Injecting the HTML description safely
						}}
					></div>
				</div>

				{/* Background image with some opacity */}
				<div className='mask-custom bg-menu-background-image h-[115vh] min-h-[115vh] w-[100vw] bg-cover bg-center opacity-75' />
			</div>
		</div>
	)
}
