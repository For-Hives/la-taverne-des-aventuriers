import { getLandingData } from '@/app/actions/GetLandingService'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

export default async function EventsComponent() {
	const data = await getLandingData()
	const eventsElement = {
		eventCard1ButtonLabel: data.event_card1_button_label,
		eventCard1ButtonUrl: data.event_card1_button_url,
		eventCard1Date: data.event_card1_date,
		eventCard1Description: data.event_card1_description,
		eventCard1Title: data.event_card1_title,
		eventCard2ButtonLabel: data.event_card2_button_label,
		eventCard2ButtonUrl: data.event_card2_button_url,
		eventCard2Date: data.event_card2_date,
		eventCard2Description: data.event_card2_description,
		eventCard2Title: data.event_card2_title,
		eventCard3ButtonLabel: data.event_card2_button_label,
		eventCard3ButtonUrl: data.event_card2_button_url,
		eventCard3Date: data.event_card2_date,
		eventCard3Description: data.event_card2_description,
		eventCard3Title: data.event_card2_title,
		eventsTitle: data.events_title,
	}

	return (
		<div className='rounded- flex h-screen w-3/4 flex-col items-start gap-9'>
			{/*Title*/}
			<h1 className='font-obraletraBold text-xl text-title-200'>
				{eventsElement.eventsTitle}
			</h1>

			{/*Layout Event cards Div*/}
			<div className='flex h-full w-full items-start gap-2'>
				{/*Fist Card Div (One Half of the max-width) + Background image "bg-lp-card1-bg bg-cover bg-center"*/}
				<div className='relative flex h-full w-1/2 flex-col flex-wrap items-start justify-end gap-2 rounded bg-lp-card1-bg bg-cover bg-center font-obraletra text-title-300'>
					{/* Overlay Gradient */}
					<div className='absolute inset-0 rounded bg-gradient-to-b from-transparent to-black'></div>
					{/* Text */}
					<div className='z-10 flex flex-col justify-start gap-9 p-12'>
						<div className='items-left flex flex-col justify-start'>
							{/* Title */}
							<h2 className='font-obraletraBold text-2xl'>
								{eventsElement.eventCard1Title}
							</h2>
							{/* Date */}
							<h3 className='text-base'>{eventsElement.eventCard1Date}</h3>
						</div>

						{/* Description */}
						{eventsElement.eventCard1Description}

						<div>
							{/* Link */}
							<Link
								href={eventsElement.eventCard1ButtonUrl}
								className='flex items-center gap-3 underline'
							>
								<span>{eventsElement.eventCard1ButtonLabel}</span>
								<FontAwesomeIcon
									icon={faChevronRight}
									className='text-title-300'
								/>
							</Link>
						</div>
					</div>
				</div>

				{/*Second Half Event Cards */}
				<div className='flex h-full w-1/2 flex-col items-start gap-2 text-title-300'>
					{/*Second Card*/}
					<div className='w-ful relative flex h-1/2 flex-col flex-wrap items-start justify-end gap-2 rounded bg-lp-card2-bg bg-cover bg-center font-obraletra text-title-300'>
						{/* Overlay Gradient */}
						<div className='absolute inset-0 rounded bg-gradient-to-b from-transparent to-black'></div>

						{/* Text */}
						<div className='z-10 flex flex-col justify-start gap-6 p-12'>
							{/* Title */}
							<h2 className='font-obraletraBold text-2xl'>
								{eventsElement.eventCard2Title}
							</h2>
							{/* Date */}
							<h3 className='text-base'>{eventsElement.eventCard2Date}</h3>
							{/* Description */}
							<p className='text-sm'>{eventsElement.eventCard2Description}</p>

							<div>
								{/* Link */}
								<Link
									href={eventsElement.eventCard2ButtonUrl}
									className='flex items-center gap-3 underline'
								>
									<span>{eventsElement.eventCard2ButtonLabel}</span>
									<FontAwesomeIcon
										icon={faChevronRight}
										className='text-title-300'
									/>
								</Link>
							</div>
						</div>
					</div>

					{/*Third Card Div*/}
					<div className='w-ful relative flex h-1/2 flex-col flex-wrap items-start justify-end gap-2 rounded bg-lp-card3-bg bg-cover bg-center font-obraletra text-title-300'>
						{/* Overlay Gradient */}
						<div className='absolute inset-0 rounded bg-gradient-to-b from-transparent to-black'></div>

						{/* Text */}
						<div className='z-10 flex flex-col justify-start gap-6 p-12'>
							{/* Title */}
							<h2 className='font-obraletraBold text-2xl'>
								{eventsElement.eventCard3Title}
							</h2>
							{/* Date */}
							<h3 className='text-base'>{eventsElement.eventCard3Date}</h3>
							{/* Description */}
							<p className='text-sm'>{eventsElement.eventCard3Description}</p>
							<div>
								{/* Link */}
								<Link
									href={eventsElement.eventCard3ButtonUrl}
									className='flex items-center gap-3 underline'
								>
									<span>{eventsElement.eventCard3ButtonLabel}</span>
									<FontAwesomeIcon
										icon={faChevronRight}
										className='text-title-300'
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
