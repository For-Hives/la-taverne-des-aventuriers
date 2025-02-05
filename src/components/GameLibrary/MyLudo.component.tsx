import { GamesPageData } from '@/app/actions/services/getGamePageData.service'
import Image from 'next/image'
import Link from 'next/link'

export default async function MyLudoComponent({
																								data,
																							}: Readonly<{
	data: GamesPageData
}>) {
	return (
		<div className='w-3/4 py-8 sm:w-3/4 sm:py-16'>
			<div className='flex w-full flex-col items-start justify-center gap-8 sm:gap-12'>
				{/* Title for the component */}
				<h2 className='font-obraletraBold text-xl text-customBrown-100 sm:text-2xl'>
					{data.myludo_component_title}
				</h2>

				<div className='relative flex w-full flex-col items-center justify-center rounded-lg overflow-hidden'>
					{/* Link to the game library, now also wrapping the image */}
					<Link
						className='relative block'
						href={data.myludo_component_url}
					>
						{/* Container div for the image and gradient, this will zoom on hover */}
						<div className='relative w-full h-auto transition-transform duration-300 transform hover:scale-105'>
							{/* Image displaying the game library */}
							<Image
								src='/assets/images/elements/GameLibraryElements/MyLudoImage.png'
								alt='MyLudo Logo'
								className='h-auto w-full'
								width={1920}
								height={1080}
							/>
							{/* Overlay gradient on top of the image */}
							<div className='absolute inset-0 rounded-lg bg-gradient-to-b from-transparent to-black'></div>
						</div>

						{/* Link text */}
						<span className='absolute bottom-5 left-10 text-center font-obraletra text-xl text-customWhite-100 hover:underline sm:text-2xl'>
              {data.myludo_component_label}
            </span>
					</Link>
				</div>
			</div>
		</div>
	)
}
