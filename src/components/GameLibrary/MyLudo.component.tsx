import { getGameLibraryPageData } from '@/app/actions/getDatasService'
import Image from 'next/image'
import Link from 'next/link'

export default async function MyLudoComponent() {
	const data = await getGameLibraryPageData()

	const GameLibraryData = {
		myludo_component_label: data.myludo_component_label,
		myludo_component_title: data.myludo_component_title,
		myludo_component_url: data.myludo_component_url,
	}

	return (
		<div className='relative w-3/4'>
			<div className='absolute z-30 flex w-full flex-col items-start justify-center gap-12'>
				<h2 className='font-obraletraBold text-xl text-title-200'>
					{GameLibraryData.myludo_component_title}
				</h2>

				<div className='relative flex w-full flex-col items-center justify-center rounded'>
					<Image
						src='/assets/images/elements/GameLibraryElements/MyLudoImage.png'
						alt='LTDA Logo'
						className='w-full'
						width={1920}
						height={1080}
					/>
					<div className='absolute inset-0 rounded bg-gradient-to-b from-transparent to-black'></div>

					<Link
						className='absolute bottom-5 left-10 text-center font-obraletra text-xl text-title-300 hover:underline'
						href={GameLibraryData.myludo_component_url}
					>
						{GameLibraryData.myludo_component_label}
					</Link>
				</div>
			</div>
		</div>
	)
}
