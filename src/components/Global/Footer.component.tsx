import { getFooterData } from '@/app/actions/services/getFooterData.service'
import Image from 'next/image'
import Link from 'next/link'

export default async function FooterComponent() {
	// Fetch footer data asynchronously
	const data = await getFooterData()

	return (
		<div
			className='relative flex w-screen items-center justify-center bg-FooterImage bg-cover bg-center text-white'
			style={{ aspectRatio: '2653 / 1000' }}
		>
			{/* Left image */}
			<div className='absolute bottom-0 left-0 flex items-center justify-center mix-blend-color-burn'>
				<Image
					src='/assets/images/elements/cristals/rock1.png'
					alt='Rock'
					className='w-full max-sm:hidden max-sm:w-36 md:w-48 xl:w-2/4'
					width={400}
					height={400}
				/>
			</div>

			{/* Main content */}
			<div className='relative z-10 flex w-full max-w-7xl flex-col items-center justify-center gap-12 p-10 text-left font-obraletra text-base text-customBrown-100 max-sm:gap-6 md:gap-8'>
				<div className='flex w-full flex-wrap items-start justify-around gap-8 sm:gap-4 md:gap-6'>
					{/* First column */}
					<div className='flex w-full max-w-xs flex-col items-center justify-center text-base max-md:text-sm'>
						<h2 className='font-cardinal text-2xl text-customBrown-100 first-letter:text-customRed-100 sm:text-xl'>
							{data.bar_title}
						</h2>
						<Link className='hover:underline' href={data.menu_url}>
							{data.menu_link_title}
						</Link>
						<Link className='hover:underline' href={data.description_url}>
							{data.description_title}
						</Link>
						<Link className='hover:underline' href={data.events_url}>
							{data.events_title}
						</Link>
						<Link className='hover:underline' href={data.game_library_url}>
							{data.game_library_title}
						</Link>
					</div>

					{/* Second column */}
					<div className='flex w-full max-w-xs flex-col items-center justify-center font-obraletra text-base text-customBrown-100 max-md:text-sm'>
						<h2 className='font-cardinal text-2xl text-customBrown-100 first-letter:text-customRed-100 sm:text-xl'>
							{data.support_title}
						</h2>
						<Link className='hover:underline' href={data.contact_url}>
							{data.contact_title}
						</Link>
						<Link className='hover:underline' href={data.reservation_url}>
							{data.reservation_link_label}
						</Link>
					</div>

					{/* Third column */}
					<div className='flex w-full max-w-xs flex-col items-center justify-center'>
						<h2 className='font-cardinal text-2xl text-customBrown-100 first-letter:text-customRed-100 sm:text-xl'>
							{data.socials_title}
						</h2>
						{/* Social media icons (placeholder for now) */}
						<div className='flex space-x-4 max-md:text-sm md:space-x-2'>
							<div>Social 1</div>
							<div>Social 2</div>
							<div>Social 3</div>
						</div>
					</div>
				</div>

				{/* Copyright section */}
				<div className='flex w-full max-w-xs flex-col items-center justify-center'>
					<p className='mt-4 text-sm max-md:text-sm'>{data.copyright}</p>
				</div>
			</div>

			{/* Right image */}
			<div className='absolute bottom-0 right-0 flex items-center justify-center mix-blend-color-burn'>
				<Image
					src='/assets/images/elements/cristals/rock2.png'
					alt='Rock'
					className='w-full max-sm:hidden max-sm:w-28 md:w-40 xl:w-2/4'
					width={300}
					height={300}
				/>
			</div>
		</div>
	)
}
