import { getWhoAreWePageData } from '@/app/actions/getWhoAreWeService'
import Image from 'next/image'

export default async function ReservationElementComponent() {
	const data = await getWhoAreWePageData()

	const WhoAreWeData = {
		description_card_1: data.description_card_1,
		description_card_2: data.description_card_2,
		description_card_3: data.description_card_3,
		description_card_4: data.description_card_4,
		description_card_5: data.description_card_5,
		information_title: data.information_title,
		our_history_title: data.our_history_title,
		our_services_title: data.our_services_title,
		team_title: data.team_title,
		who_are_we_title: data.who_are_we_title,
	}

	return (
		<div className='flex h-full w-4/5 gap-3 font-obraletra text-base text-title-200 max-xl:flex-col xl:h-screen'>
			{/* first part of the Cards */}
			<div className='flex h-full w-full flex-col gap-3 2xl:w-3/4'>
				{/* First Card */}
				<div className='bg-waw-card1-bg relative flex h-1/4 items-center justify-start rounded border border-title-200 bg-cover'>
					{/* white Gradient */}
					<div className='absolute inset-0 rounded bg-gradient-to-r from-title-600/100 via-title-600/100 to-title-600/20'></div>

					{/* Text */}
					<div className='relative z-10 flex w-full flex-col gap-3 p-5 xl:w-2/3'>
						<h1 className='font-cardinal text-3xl first-letter:text-title-100'>
							{WhoAreWeData.who_are_we_title}
						</h1>
						<div
							dangerouslySetInnerHTML={{
								__html: WhoAreWeData.description_card_1,
							}}
						></div>
					</div>
				</div>

				<div className='flex h-3/4 gap-3'>
					<div className='flex w-full items-start justify-start gap-3 max-md:flex-col xl:w-1/3 xl:flex-col'>
						{/* Second Card */}
						<div className='flex h-auto flex-col justify-start gap-3 rounded border border-title-200 bg-title-600 p-5 max-xl:h-full max-xl:w-1/2 max-md:w-full 2xl:h-auto'>
							<h2 className='font-cardinal text-3xl first-letter:text-title-100'>
								{WhoAreWeData.our_history_title}
							</h2>
							<div
								dangerouslySetInnerHTML={{
									__html: WhoAreWeData.description_card_2,
								}}
							></div>
						</div>

						{/* third Card */}
						<div className='flex h-1/2 w-full flex-col justify-start gap-3 rounded border border-title-200 bg-title-600 p-5 max-xl:h-full max-xl:w-1/2 max-md:w-full'>
							<h2 className='font-cardinal text-3xl first-letter:text-title-100'>
								{WhoAreWeData.our_services_title}
							</h2>
							<div
								dangerouslySetInnerHTML={{
									__html: WhoAreWeData.description_card_3,
								}}
							></div>
						</div>
					</div>

					{/* Logo Card */}
					<div className='flex h-full w-2/3 items-center justify-center rounded border border-title-200 bg-title-600 max-xl:hidden'>
						<Image
							src='/assets/images/LTDALogo.png'
							alt='LTDA Logo'
							width={520}
							height={520}
						/>
					</div>
				</div>
			</div>

			{/* Second Part Of Cards */}
			<div className='flex h-full w-1/4 flex-col gap-3 max-xl:w-full'>
				{/* First Card */}
				<div className='flex h-2/5 flex-col items-start justify-start gap-3 rounded border border-title-200 bg-title-600 p-5'>
					<h2 className='font-cardinal text-3xl first-letter:text-title-100'>
						{WhoAreWeData.team_title}
					</h2>
					<div
						dangerouslySetInnerHTML={{
							__html: WhoAreWeData.description_card_4,
						}}
					></div>
				</div>

				{/* Second Card */}
				<div className='bg-waw-card2-bg relative flex h-3/5 w-full flex-col items-start justify-start gap-3 rounded border border-title-200 bg-title-600 bg-white/80 bg-cover p-5 max-2xl:h-full'>
					{/* Gradient */}
					<div className='absolute inset-0 z-0 rounded bg-gradient-to-r from-title-600/100 via-title-600/100 to-title-600/30 xl:bg-gradient-to-b'></div>

					<h2 className='z-10 font-cardinal text-3xl first-letter:text-title-100'>
						{WhoAreWeData.information_title}
					</h2>
					<div
						className='z-30'
						dangerouslySetInnerHTML={{
							__html: WhoAreWeData.description_card_5,
						}}
					></div>
				</div>
			</div>
		</div>
	)
}
