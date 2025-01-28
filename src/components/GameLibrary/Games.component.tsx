import { getGameLibraryPageData } from '@/app/actions/getDatasService'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

export default async function GameComponent() {
	// Fetch the game library page data
	const data = await getGameLibraryPageData()

	// Structure the data into variables for easy access
	const GameLibraryData = {
		Card_Title: data.Card_Title,
		card1_button_label: data.card1_button_label,
		card1_button_url: data.card1_button_url,
		card1_description: data.card1_description,
		card1_title: data.card1_title,
		card2_button_label: data.card2_button_label,
		card2_button_url: data.card2_button_url,
		card2_description: data.card2_description,
		card2_title: data.card2_title,
		card3_button_label: data.card3_button_label,
		card3_button_url: data.card3_button_url,
		card3_description: data.card3_description,
		card3_title: data.card3_title,
	}

	return (
		<div className='rounded- flex h-screen w-3/4 flex-col items-start gap-9 max-lg:w-full'>
			{/* Title Section */}
			<h2 className='font-obraletraBold text-xl text-title-200'>
				{GameLibraryData.Card_Title}
			</h2>

			{/* Layout for Event Cards */}
			<div className='flex h-full w-full items-center gap-2 max-lg:flex-col'>
				{/* First Card */}
				<div className='relative flex h-full w-1/2 flex-col flex-wrap items-start justify-end gap-2 rounded bg-gl-card1-bg bg-cover bg-center font-obraletra text-title-300 max-lg:w-4/5'>
					{/* Overlay Gradient */}
					<div className='absolute inset-0 rounded bg-gradient-to-b from-transparent to-black'></div>
					{/* Card Content */}
					<div className='z-10 flex flex-col justify-start gap-9 p-12'>
						<h2 className='font-obraletraBold text-2xl'>
							{GameLibraryData.card1_title}
						</h2>
						<div
							dangerouslySetInnerHTML={{
								__html: GameLibraryData.card1_description,
							}}
						></div>
						{/* Button with link and icon */}
						<Link
							href={GameLibraryData.card1_button_url}
							className='flex items-center gap-3 underline'
						>
							<span>{GameLibraryData.card1_button_label}</span>
							<FontAwesomeIcon
								icon={faChevronRight}
								className='h-4 w-4 text-title-300'
							/>
						</Link>
					</div>
				</div>

				{/* Second Column */}
				<div className='flex h-full w-1/2 flex-col items-center gap-2 text-title-300 max-lg:w-full'>
					{/* Second Card */}
					<div className='relative flex h-1/2 w-full flex-col flex-wrap items-start justify-end gap-2 rounded bg-gl-card2-bg bg-cover bg-center max-lg:w-4/5'>
						{/* Overlay Gradient */}
						<div className='absolute inset-0 rounded bg-gradient-to-b from-transparent to-black'></div>
						<div className='z-10 flex flex-col justify-start gap-6 p-12'>
							<h2 className='font-obraletraBold text-2xl'>
								{GameLibraryData.card2_title}
							</h2>
							<div
								dangerouslySetInnerHTML={{
									__html: GameLibraryData.card2_description,
								}}
							></div>
							{/* Button with link and icon */}
							<Link
								href={GameLibraryData.card2_button_url}
								className='flex items-center gap-3 underline'
							>
								<span>{GameLibraryData.card2_button_label}</span>
								<FontAwesomeIcon icon={faChevronRight} className='h-4 w-4' />
							</Link>
						</div>
					</div>

					{/* Third Card */}
					<div className='relative flex h-1/2 w-full flex-col flex-wrap items-start justify-end gap-2 rounded bg-gl-card3-bg bg-cover bg-center max-lg:w-4/5'>
						{/* Overlay Gradient */}
						<div className='absolute inset-0 rounded bg-gradient-to-b from-transparent to-black'></div>
						<div className='z-10 flex flex-col justify-start gap-6 p-12'>
							<h2 className='font-obraletraBold text-2xl'>
								{GameLibraryData.card3_title}
							</h2>
							<div
								dangerouslySetInnerHTML={{
									__html: GameLibraryData.card3_description,
								}}
							></div>
							{/* Button with link and icon */}
							<Link
								href={GameLibraryData.card3_button_url}
								className='flex items-center gap-3 underline'
							>
								<span>{GameLibraryData.card3_button_label}</span>
								<FontAwesomeIcon icon={faChevronRight} className='h-4 w-4' />
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
