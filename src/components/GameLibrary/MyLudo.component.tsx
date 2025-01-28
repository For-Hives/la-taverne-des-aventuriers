import { getGameLibraryPageData } from '@/app/actions/services/getGamePageData.service'
import Image from 'next/image'
import Link from 'next/link'

export default async function MyLudoComponent() {
	// Fetch the data for the game library component
	const data = await getGameLibraryPageData()

	// Structure the fetched data
	const GameLibraryData = {
		myludo_component_label: data.myludo_component_label,
		myludo_component_title: data.myludo_component_title,
		myludo_component_url: data.myludo_component_url,
	}

	return (
		<div className='w-full py-8 sm:w-3/4 sm:py-16'>
			<div className='flex w-full flex-col items-start justify-center gap-8 sm:gap-12'>
				{/* Title for the component */}
				<h2 className='font-obraletraBold text-xl text-title-200 sm:text-2xl'>
					{GameLibraryData.myludo_component_title}
				</h2>

				<div className='relative flex w-full flex-col items-center justify-center rounded'>
					{/* Image displaying the game library */}
					<Image
						src='/assets/images/elements/GameLibraryElements/MyLudoImage.png'
						alt='LTDA Logo'
						className='h-auto w-full'
						width={1920}
						height={1080}
					/>
					{/* Overlay gradient on top of the image */}
					<div className='absolute inset-0 rounded bg-gradient-to-b from-transparent to-black'></div>

					{/* Link to the game library */}
					<Link
						className='absolute bottom-5 left-10 text-center font-obraletra text-xl text-title-300 hover:underline sm:text-2xl'
						href={GameLibraryData.myludo_component_url}
					>
						{GameLibraryData.myludo_component_label}
					</Link>
				</div>
			</div>
		</div>
	)
}
