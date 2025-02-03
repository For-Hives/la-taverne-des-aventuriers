import { getWhoAreWePageData } from '@/app/actions/services/getWhoAreWePageData.service';
import Image from 'next/image';

export default async function ReservationElementComponent() {
	const data = await getWhoAreWePageData();

	return (
		<div className='flex h-full w-11/12 items-center justify-center font-cardoRegular text-customBrown-100'>
			<div className='grid h-full w-full grid-cols-1 grid-rows-10 gap-4 sm:grid-cols-2 xl:grid-cols-10'>
				{/* Card 1 */}
				<div className='col-span-1 row-span-2 flex items-center justify-start rounded-xl border border-customBrown-100 bg-customWhite-300 sm:col-span-2 sm:row-span-2 xl:col-span-8 xl:row-span-3'>
					<div
						className='relative flex h-full w-full items-center overflow-hidden rounded-xl px-5 sm:px-10 xl:px-20'
						style={{
							backgroundImage: `url(${data.image_card1})`,
							backgroundPosition: 'center',
							backgroundSize: 'cover',
						}}
					>
						{/* Gradient Overlay */}
						<div className='absolute inset-0 z-0 bg-gradient-to-r from-customWhite-300/100 via-customWhite-300/100 to-customWhite-300/20' />

						{/* Content */}
						<div className='relative z-10 flex-col'>
							<h1 className='font-cardinal text-2xl tracking-wider first-letter:text-customRed-100 sm:text-3xl'>
								{data.who_are_we_title}
							</h1>
							<div
								dangerouslySetInnerHTML={{ __html: data.description_card_1 }}
							/>
						</div>
					</div>
				</div>

				{/* Card 2 */}
				<div className='col-span-1 row-span-2 flex flex-col items-start justify-start rounded-xl border border-customBrown-100 bg-customWhite-300 sm:col-span-1 sm:row-span-4 xl:col-span-2'>
					<div className='p-6'>
						<h2 className='font-cardinal text-2xl first-letter:text-customRed-100 sm:text-3xl'>
							{data.team_title}
						</h2>
						<div
							dangerouslySetInnerHTML={{ __html: data.description_card_4 }}
						/>
					</div>
				</div>

				{/* Card 3 */}
				<div className='col-span-1 row-span-2 flex flex-col items-start justify-start rounded-xl border border-customBrown-100 bg-customWhite-300 sm:col-span-1 sm:row-span-4 xl:col-span-2'>
					<div className='p-6'>
						<h2 className='font-cardinal text-2xl first-letter:text-customRed-100 sm:text-3xl'>
							{data.our_history_title}
						</h2>
						<div
							dangerouslySetInnerHTML={{ __html: data.description_card_2 }}
						/>
					</div>
				</div>

				{/* Central Logo */}
				<div className='bg-tan-200 relative col-span-1 row-span-3 flex items-center justify-center rounded-xl border border-customBrown-100 bg-customWhite-300 max-xl:hidden sm:col-span-2 sm:row-span-10 xl:col-span-6'>
					<Image
						src='/assets/images/LTDALogo.png'
						alt='LTDA Logo'
						width={520}
						height={520}
					/>
					<Image
						src='/assets/images/elements/WhoAreWeElement/dice.png'
						alt='Dice'
						width={50}
						height={50}
						className='absolute bottom-0 right-5 z-10 w-1/4 max-sm:hidden sm:right-20'
					/>
				</div>

				{/* Card 4 */}
				<div className='col-span-1 row-span-2 flex items-center justify-start rounded-xl border border-customBrown-100 bg-customWhite-300 sm:col-span-2 sm:row-span-9 xl:col-span-2'>
					<div
						className='relative flex h-full w-full items-center overflow-hidden rounded-xl'
						style={{
							backgroundImage: `url(${data.image_card5})`,
							backgroundPosition: 'center',
							backgroundSize: 'cover',
						}}
					>
						{/* Gradient Overlay */}
						<div className='absolute inset-0 z-0 bg-gradient-to-b from-customWhite-300/100 via-customWhite-300/100 to-customWhite-300/20 max-xl:bg-gradient-to-r' />

						{/* Content */}
						<div className='relative z-10 flex-col p-6'>
							<h2 className='font-cardinal text-2xl first-letter:text-customRed-100 sm:text-3xl'>
								{data.information_title}
							</h2>
							<div
								dangerouslySetInnerHTML={{ __html: data.description_card_5 }}
							/>
						</div>
					</div>
				</div>

				{/* Card 5 */}
				<div className='col-span-1 row-span-2 flex items-start justify-start rounded-xl border border-customBrown-100 bg-customWhite-300 sm:col-span-2 sm:row-span-6 xl:col-span-2'>
					<div className='flex flex-col p-6'>
						<h2 className='font-cardinal text-2xl first-letter:text-customRed-100 sm:text-3xl'>
							{data.our_services_title}
						</h2>
						<div
							dangerouslySetInnerHTML={{ __html: data.description_card_3 }}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
