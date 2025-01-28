import { getFooterData } from '@/app/actions/services/getFooterData.service'
import Image from 'next/image'
import Link from 'next/link'

export default async function FooterComponent() {
	// Fetch footer data asynchronously
	const data = await getFooterData()

	// Create an object to store all the footer data
	const FooterData = {
		barTitle: data.bar_title,
		contactTitle: data.contact_title,
		contactUrl: data.contact_url,
		copyright: data.copyright,
		descriptionTitle: data.description_title,
		descriptionUrl: data.description_url,
		eventsTitle: data.events_title,
		eventsUrl: data.events_url,
		facebookUrl: data.facebook_url,
		gameLibraryTitle: data.game_library_title,
		gameLibraryUrl: data.game_library_url,
		image1: data.image1,
		image2: data.image2,
		instagramUrl: data.instagram_url,
		menuLinkTitle: data.menu_link_title,
		menuUrl: data.menu_url,
		reservationLinkTitle: data.reservation_link_url,
		reservationUrl: data.reservation_url,
		socialsTitle: data.socials_title,
		supportTitle: data.support_title,
		twitterUrl: data.twitter_url,
	}

	return (
		<div
			className='relative flex w-screen items-center justify-center bg-FooterImage bg-cover bg-center text-white'
			style={{ aspectRatio: '2653 / 1000' }}
		>
			{/* Left image */}
			<div className='absolute bottom-0 left-0 flex items-center justify-center mix-blend-color-burn'>
				<Image
					src='/assets/images/elements/cristals/rock1.png'
					alt='LTDA Logo'
					className='w-full max-sm:hidden max-sm:w-36 md:w-48 xl:w-2/4'
					width={400}
					height={400}
				/>
			</div>

			{/* Main content */}
			<div className='text-customBrown-100 relative z-10 flex w-full max-w-7xl flex-col items-center justify-center gap-12 p-10 text-left font-obraletra text-base max-sm:gap-6 md:gap-8'>
				<div className='flex w-full flex-wrap items-start justify-around gap-8 sm:gap-4 md:gap-6'>
					{/* First column */}
					<div className='flex w-full max-w-xs flex-col items-center justify-center text-base max-md:text-sm'>
						<h2 className='text-customBrown-100 first-letter:text-customRed-100 font-cardinal text-2xl sm:text-xl'>
							{FooterData.barTitle}
						</h2>
						<Link className='hover:underline' href={FooterData.menuUrl}>
							{FooterData.menuLinkTitle}
						</Link>
						<Link className='hover:underline' href={FooterData.descriptionUrl}>
							{FooterData.descriptionTitle}
						</Link>
						<Link className='hover:underline' href={FooterData.eventsUrl}>
							{FooterData.eventsTitle}
						</Link>
						<Link className='hover:underline' href={FooterData.gameLibraryUrl}>
							{FooterData.gameLibraryTitle}
						</Link>
					</div>

					{/* Second column */}
					<div className='text-customBrown-100 flex w-full max-w-xs flex-col items-center justify-center font-obraletra text-base max-md:text-sm'>
						<h2 className='text-customBrown-100 first-letter:text-customRed-100 font-cardinal text-2xl sm:text-xl'>
							{FooterData.supportTitle}
						</h2>
						<Link className='hover:underline' href={FooterData.contactUrl}>
							{FooterData.contactTitle}
						</Link>
						<Link className='hover:underline' href={FooterData.reservationUrl}>
							{FooterData.reservationLinkTitle}
						</Link>
					</div>

					{/* Third column */}
					<div className='flex w-full max-w-xs flex-col items-center justify-center'>
						<h2 className='text-customBrown-100 first-letter:text-customRed-100 font-cardinal text-2xl sm:text-xl'>
							{FooterData.socialsTitle}
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
					<p className='mt-4 text-sm max-md:text-sm'>{FooterData.copyright}</p>
				</div>
			</div>

			{/* Right image */}
			<div className='absolute bottom-0 right-0 flex items-center justify-center mix-blend-color-burn'>
				<Image
					src='/assets/images/elements/cristals/rock2.png'
					alt='LTDA Logo'
					className='w-full max-sm:hidden max-sm:w-28 md:w-40 xl:w-2/4'
					width={300}
					height={300}
				/>
			</div>
		</div>
	)
}
