import { getWhoAreWePageData } from '@/app/actions/services/getWhoAreWePageData.service'
import Image from 'next/image'

export default async function ReservationElementComponent() {
	// Fetch data for the "Who Are We" page
	const data = await getWhoAreWePageData()

	return (
		// Main container for the component, flexbox with responsive column layout
		<div className="flex w-4/5 gap-3 font-obraletra text-base text-customBrown-100 max-xl:flex-col xl:h-screen">
			{/* First part of the cards */}
			<div className="flex h-full w-full flex-col gap-3 2xl:w-3/4">
				{/* First card with a background image */}
				<div className="relative flex min-h-[300px] items-center justify-start rounded border border-customBrown-100 bg-waw-card1-bg bg-cover">
					{/* Overlay gradient for better text contrast */}
					<div className="absolute inset-0 rounded bg-gradient-to-r from-customWhite-300/100 via-customWhite-300/100 to-customWhite-300/20"></div>

					{/* Card content */}
					<div className="relative z-10 flex w-full flex-col gap-3 p-5 xl:w-2/3">
						{/* Title */}
						<h1 className="font-cardinal text-3xl tracking-wider first-letter:text-customRed-100">
							{data.who_are_we_title}
						</h1>
						{/* Dynamic description content */}
						<div dangerouslySetInnerHTML={{ __html: data.description_card_1 }}></div>
					</div>
				</div>

				{/* Second row of cards */}
				<div className="flex gap-3 flex-grow">
					{/* Left column of cards */}
					<div className="flex w-full items-start justify-start gap-3 max-md:flex-col xl:w-1/3 xl:flex-col">
						{/* Second card */}
						<div className="flex min-h-[300px] w-full flex-col justify-start gap-3 rounded border border-customBrown-100 bg-customWhite-300 p-5 flex-grow">
							<h2 className="font-cardinal text-3xl first-letter:text-customRed-100">
								{data.our_history_title}
							</h2>
							<div dangerouslySetInnerHTML={{ __html: data.description_card_2 }}></div>
						</div>

						{/* Third card */}
						<div className="flex min-h-[300px] w-full flex-col justify-start gap-3 rounded border border-customBrown-100 bg-customWhite-300 p-5 flex-grow">
							<h2 className="font-cardinal text-3xl first-letter:text-customRed-100">
								{data.our_services_title}
							</h2>
							<div dangerouslySetInnerHTML={{ __html: data.description_card_3 }}></div>
						</div>
					</div>

					{/* Logo card */}
					<div className="relative flex h-full w-2/3 items-center justify-center rounded border border-customBrown-100 bg-customWhite-300 max-xl:hidden flex-grow">
						<Image src="/assets/images/LTDALogo.png" alt="LTDA Logo" width={520} height={520} />
						<Image
							src="/assets/images/elements/WhoAreWeElement/dice.png"
							alt="Dice"
							width={50}
							height={50}
							className="absolute right-20 bottom-0 z-10 w-1/4 translate-x-1/2 translate-y-1/2 max-lg:hidden"
						/>
					</div>
				</div>
			</div>

			{/* Second part of the cards (adjusted to match the height) */}
			<div className="flex h-full w-1/4 flex-col gap-3 max-xl:w-full flex-grow">
				{/* Fourth card */}
				<div className="relative flex min-h-[300px] flex-col items-start justify-start gap-3 rounded border border-customBrown-100 bg-customWhite-300 p-5 flex-grow">
					<Image
						src="/assets/images/elements/WhoAreWeElement/dice.png"
						alt="Dice"
						width={100}
						height={100}
						className="absolute right-0 top-0 z-10 w-1/2 translate-x-1/2 -translate-y-1/2 max-xl:hidden"
					/>
					<h2 className="font-cardinal text-3xl first-letter:text-customRed-100">{data.team_title}</h2>
					<div dangerouslySetInnerHTML={{ __html: data.description_card_4 }}></div>
				</div>

				{/* Fifth card with background and gradient */}
				<div className="relative flex min-h-[300px] w-full flex-col items-start justify-start gap-3 rounded border border-customBrown-100 bg-customWhite-300 bg-white/80 bg-waw-card2-bg bg-cover p-5 flex-grow">
					{/* Overlay gradient */}
					<div className="absolute inset-0 z-0 rounded bg-gradient-to-r from-customWhite-300/100 via-customWhite-300/100 to-customWhite-300/30 xl:bg-gradient-to-b"></div>
					<h2 className="z-10 font-cardinal text-3xl first-letter:text-customRed-100">
						{data.information_title}
					</h2>
					<div className="z-30" dangerouslySetInnerHTML={{ __html: data.description_card_5 }} />
				</div>
			</div>
		</div>
	)
}
