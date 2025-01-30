import { getMenuPageData } from '@/app/actions/services/getMenuData.service' // Import the function to get menu page data

// The MenuHeroComponent component
export default async function MenuHeroComponent() {
	// Fetching the data for the menu hero section
	const data = await getMenuPageData()

	return (
		<div className={'relative'}>
			{/* Container for the hero section */}
			<div>
				{/* Hero text content */}
				<div className='absolute left-1/2 top-[45vh] z-30 flex w-1/2 -translate-x-1/2 -translate-y-1/2 transform flex-col items-center gap-12'>
					{/* Hero title */}
					<h1 className='font-cardinal text-8xl text-customBrown-100 opacity-100 first-letter:text-customRed-100 max-sm:text-7xl'>
						{data.menu_hero_title} {/* Displaying the menu hero title */}
					</h1>

					{/* Hero description */}
					<div
						className='text-center font-obraletra text-xl text-customBrown-100 max-sm:text-sm'
						dangerouslySetInnerHTML={{
							__html: data.menu_hero_description, // Injecting the HTML description safely
						}}
					></div>
				</div>

				{/* Background image with some opacity */}
				<div className='mask-custom h-[115vh] min-h-[115vh] w-[100vw] bg-menu-background-image bg-cover bg-center opacity-75' />
			</div>
		</div>
	)
}
