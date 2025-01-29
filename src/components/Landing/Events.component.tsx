import { LandingPageData } from '@/app/actions/services/getLandingPageData.service'
import { textToSpanColored } from '@/utils/textToSpanColored'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

export default async function EventsComponent({
	data,
}: {
	data: LandingPageData
}) {
	const eventsElement = {
		event_card1_button_label: data.event_card1_button_label,
		event_card1_button_url: data.event_card1_button_url,
		event_card1_date: data.event_card1_date,
		event_card1_description: textToSpanColored(data.event_card1_description),
		event_card1_image: data.event_card1_image,
		event_card1_title: textToSpanColored(data.event_card1_title),

		event_card2_button_label: data.event_card2_button_label,
		event_card2_button_url: data.event_card2_button_url,
		event_card2_date: data.event_card2_date,
		event_card2_description: textToSpanColored(data.event_card2_description),
		event_card2_image: data.event_card2_image,
		event_card2_title: textToSpanColored(data.event_card2_title),

		event_card3_button_label: data.event_card3_button_label,
		event_card3_button_url: data.event_card3_button_url,
		event_card3_date: data.event_card3_date,
		event_card3_description: textToSpanColored(data.event_card3_description),
		event_card3_image: data.event_card3_image,
		event_card3_title: textToSpanColored(data.event_card3_title),

		events_title: textToSpanColored(data.events_title),
	}

	return (
		<div className='rounded- flex h-screen w-3/4 flex-col items-start gap-9'>
			{/*Title*/}
			<h1 className='font-obraletraBold text-xl text-customBrown-100 max-sm:text-base'>
				{eventsElement.events_title}
			</h1>

			{/*Layout Event cards Div*/}
			<div className='flex h-full w-full items-center gap-2 max-lg:flex-col'>
				{/*Fist Card Div (One Half of the max-width) + Background image "bg-lp-card1-bg bg-cover bg-center"*/}
				<div className='relative flex h-full w-1/2 flex-col flex-wrap items-start justify-end gap-2 rounded bg-lp-card1-bg bg-cover bg-center font-obraletra text-customWhite-100 max-lg:w-full'>
					{/* Overlay Gradient */}
					<div className='absolute inset-0 rounded bg-gradient-to-b from-transparent to-black'></div>
					{/* Text */}
					<div className='z-10 flex flex-col justify-start gap-9 p-12'>
						<div className='items-left flex flex-col justify-start'>
							{/* Title */}
							<h2 className='font-obraletraBold text-2xl'>
								{eventsElement.event_card1_title}
							</h2>
							{/* Date */}
							<h3 className='text-base max-lg:text-xs'>
								{eventsElement.event_card1_date}
							</h3>
						</div>

						<div
							className='text-base max-sm:text-xs'
							dangerouslySetInnerHTML={{
								__html: eventsElement.event_card1_description,
							}}
						></div>

						<div>
							{/* Link */}
							<Link
								href={eventsElement.event_card1_button_url}
								className='flex items-center gap-3 text-base underline max-lg:text-xs'
							>
								<span>{eventsElement.event_card1_button_label}</span>
								<FontAwesomeIcon
									icon={faChevronRight}
									className='h-4 w-4 text-base text-customWhite-100 max-lg:text-xs max-sm:h-3 max-sm:w-3'
								/>
							</Link>
						</div>
					</div>
				</div>

				{/*Second Half Event Cards */}
				<div className='flex h-full w-1/2 flex-col items-start gap-2 text-customWhite-100 max-lg:w-full'>
					{/*Second Card*/}
					<div className='w-ful relative flex h-1/2 flex-col flex-wrap items-start justify-end gap-2 rounded bg-lp-card2-bg bg-cover bg-center font-obraletra text-customWhite-100'>
						{/* Overlay Gradient */}
						<div className='absolute inset-0 rounded bg-gradient-to-b from-transparent to-black'></div>

						{/* Text */}
						<div className='z-10 flex flex-col justify-start gap-6 p-12'>
							{/* Title */}
							<h2 className='font-obraletraBold text-2xl max-sm:text-base'>
								{eventsElement.event_card2_title}
							</h2>
							{/* Date */}
							<h3 className='text-base max-lg:text-xs'>
								{eventsElement.event_card2_date}
							</h3>
							<div
								className='text-base max-lg:text-xs'
								dangerouslySetInnerHTML={{
									__html: eventsElement.event_card2_description,
								}}
							></div>

							<div>
								{/* Link */}
								<Link
									href={eventsElement.event_card2_button_url}
									className='flex items-center gap-3 text-base underline max-lg:text-xs'
								>
									<span>{eventsElement.event_card2_button_label}</span>
									<FontAwesomeIcon
										icon={faChevronRight}
										className='h-4 w-4 text-base text-customWhite-100 max-lg:text-xs max-sm:h-3 max-sm:w-3'
									/>
								</Link>
							</div>
						</div>
					</div>

					{/*Third Card Div*/}
					<div className='relative flex h-1/2 w-full flex-col flex-wrap items-start justify-end gap-2 rounded bg-lp-card3-bg bg-cover bg-center font-obraletra text-customWhite-100 max-lg:w-full'>
						{/* Overlay Gradient */}
						<div className='absolute inset-0 rounded bg-gradient-to-b from-transparent to-black'></div>

						{/* Text */}
						<div className='z-10 flex flex-col justify-start gap-6 p-12'>
							{/* Title */}
							<h2 className='font-obraletraBold text-2xl'>
								{eventsElement.event_card3_title}
							</h2>
							{/* Date */}
							<h3 className='text-base max-lg:text-xs'>
								{eventsElement.event_card3_date}
							</h3>
							{/* Description */}
							<div
								className='text-base max-lg:text-xs'
								dangerouslySetInnerHTML={{
									__html: eventsElement.event_card3_description,
								}}
							></div>
							<div>
								{/* Link */}
								<Link
									href={eventsElement.event_card3_button_url}
									className='flex items-center gap-3 text-base underline max-lg:text-xs'
								>
									<span>{eventsElement.event_card3_button_label}</span>
									<FontAwesomeIcon
										icon={faChevronRight}
										className='h-4 w-4 text-customWhite-100 max-sm:h-3 max-sm:w-3'
									/>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
