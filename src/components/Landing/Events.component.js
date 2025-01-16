import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

const EventsComponent = () => {
	return (
		<div className='rounded- flex h-screen w-3/4 flex-col items-start gap-9'>
			{/*Title*/}
			<h1 className='font-obraletraBold text-xl text-title-200'>
				Oyez Oyez ! Découvrez nos Eènements récents !
			</h1>

			{/*Layout Event cards Div*/}
			<div className='flex h-full w-full items-start gap-2'>
				{/*Fist Card Div (One Half of the max-width) + Background image "bg-lp-card1-bg bg-cover bg-center"*/}
				<div className='font-obraletra relative flex h-full w-1/2 flex-col flex-wrap items-start justify-end gap-2 rounded bg-lp-card1-bg bg-cover bg-center text-title-300'>
					{/* Overlay Gradient */}
					<div className='absolute inset-0 rounded bg-gradient-to-b from-transparent to-black'></div>
					{/* Text */}
					<div className='z-10 flex flex-col justify-start gap-9 p-12'>
						<div className='items-left flex flex-col justify-start'>
							{/* Title */}
							<h2 className='font-obraletraBold text-2xl'>
								Nouveau Cocktail !
							</h2>
							{/* Date */}
							<h3 className='text-base'>13/01/2025</h3>
						</div>

						{/* Description */}
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut
							turpis dictum, feugiat justo nec, ultrices urna. Curabitur ut
							ipsum et libero pretium viverra. Nullam sed lacus enim. Sed
							tincidunt tincidunt urna, in lacinia ipsum ullamcorper eu. Nunc
							tempus eget augue at interdum. Aliquam in maximus nisl. Duis
							accumsan venenatis dui, dignissim congue leo scelerisque in. Sed
							hendrerit efficitur viverra.
						</p>

						<div>
							{/* Link */}
							<Link href='/' className='flex items-center gap-3 underline'>
								<span>Read More</span>
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
					<div className='font-obraletra w-ful relative flex h-1/2 flex-col flex-wrap items-start justify-end gap-2 rounded bg-lp-card2-bg bg-cover bg-center text-title-300'>
						{/* Overlay Gradient */}
						<div className='absolute inset-0 rounded bg-gradient-to-b from-transparent to-black'></div>

						{/* Text */}
						<div className='z-10 flex flex-col justify-start gap-6 p-12'>
							{/* Title */}
							<h2 className='font-obraletraBold text-2xl'>
								Nouveau Cocktail !
							</h2>
							{/* Date */}
							<h3 className='text-base'>13/01/2025</h3>
							{/* Description */}
							<p className='text-sm'>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
								ut turpis dictum, feugiat justo nec, ultrices urna. Curabitur ut
								ipsum et libero pretium viverra. Nullam sed lacus enim. Sed
								tincidunt tincidunt urna, in lacinia ipsum ullamcorper eu. Nunc
								tempus eget augue at interdum. Aliquam in maximus nisl. Duis
								accumsan venenatis dui, dignissim congue leo scelerisque in. Sed
								hendrerit efficitur viverra.
							</p>

							<div>
								{/* Link */}
								<Link href='/' className='flex items-center gap-3 underline'>
									<span>Read More</span>
									<FontAwesomeIcon
										icon={faChevronRight}
										className='text-title-300'
									/>
								</Link>
							</div>
						</div>
					</div>

					{/*Third Card Div*/}
					<div className='font-obraletra w-ful relative flex h-1/2 flex-col flex-wrap items-start justify-end gap-2 rounded bg-lp-card3-bg bg-cover bg-center text-title-300'>
						{/* Overlay Gradient */}
						<div className='absolute inset-0 rounded bg-gradient-to-b from-transparent to-black'></div>

						{/* Text */}
						<div className='z-10 flex flex-col justify-start gap-6 p-12'>
							{/* Title */}
							<h2 className='font-obraletraBold text-2xl'>
								Nouveau Cocktail !
							</h2>
							{/* Date */}
							<h3 className='text-base'>13/01/2025</h3>
							{/* Description */}
							<p className='text-sm'>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
								ut turpis dictum, feugiat justo nec, ultrices urna. Curabitur ut
								ipsum et libero pretium viverra. Nullam sed lacus enim. Sed
								tincidunt tincidunt urna, in lacinia ipsum ullamcorper eu. Nunc
								tempus eget augue at interdum. Aliquam in maximus nisl. Duis
								accumsan venenatis dui, dignissim congue leo scelerisque in. Sed
								hendrerit efficitur viverra.
							</p>
							<div>
								{/* Link */}
								<Link href='/' className='flex items-center gap-3 underline'>
									<span>Read More</span>
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

export default EventsComponent
