import Link from 'next/link'

const EventsComponent = () => {
	return (
		<div className='flex h-screen w-3/4 flex-col items-start gap-16 rounded-lg bg-gray-400'>
			{/*Title*/}
			<h1 className='text-gray-700'>
				Oyez Oyez ! Découvrez nos Eènements récents !
			</h1>

			{/*Layout Event cards Div*/}
			<div className='flex h-full w-full items-start gap-2'>
				{/*Fist Card Div (One Half of the max-width) + Background image "bg-lp-card1-bg bg-cover bg-center"*/}
				<div className='flex h-full w-1/2 flex-wrap items-start gap-2 rounded-lg bg-lp-card1-bg bg-cover bg-center text-gray-700'>
					{/*Text Div*/}
					<div className='bottom-0 left-0 gap-2'>
						{/*Title*/}
						<h1>Nouveau Cocktail !</h1>
						{/*Date*/}
						<h3>13/01/2025</h3>
						{/*Description*/}
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut
							turpis dictum, feugiat justo nec, ultrices urna. Curabitur ut
							ipsum et libero pretium viverra. Nullam sed lacus enim. Sed
							tincidunt tincidunt urna, in lacinia ipsum ullamcorper eu. Nunc
							tempus eget augue at interdum. Aliquam in maximus nisl. Duis
							accumsan venenatis dui, dignissim congue leo scelerisque in. Sed
							hendrerit efficitur viverra.
						</p>
						{/*Link*/}
						<Link href='/'>Read More</Link>
					</div>
				</div>

				{/*Second Half Event Cards */}
				<div className='flex h-full w-1/2 flex-col items-start gap-2 text-gray-700'>
					{/*Second Card*/}
					<div className='flex h-1/2 w-full flex-wrap items-start gap-2 rounded-lg bg-lp-card2-bg'>
						{/*Text Div*/}
						<div className='bottom-0 left-0 gap-2'>
							{/*Title*/}
							<h1>Nouveau Cocktail !</h1>
							{/*Date*/}
							<h3>13/01/2025</h3>
							{/*Description*/}
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
								ut turpis dictum, feugiat justo nec, ultrices urna. Curabitur ut
								ipsum et libero pretium viverra. Nullam sed lacus enim. Sed
								tincidunt tincidunt urna, in lacinia ipsum ullamcorper eu. Nunc
								tempus eget augue at interdum. Aliquam in maximus nisl. Duis
								accumsan venenatis dui, dignissim congue leo scelerisque in. Sed
								hendrerit efficitur viverra.
							</p>
							{/*Link*/}
							<Link href='/'>Read More</Link>
						</div>
					</div>

					{/*Third Card Div*/}
					<div className='flex h-1/2 w-full flex-col items-start gap-2 rounded-lg bg-lp-card3-bg text-gray-700'>
						{/*Text*/}
						<div className='bottom-0 left-0 gap-2'>
							{/*Title*/}
							<h1>Nouveau Cocktail !</h1>
							{/*Date*/}
							<h3>13/01/2025</h3>
							{/*Description*/}
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
								ut turpis dictum, feugiat justo nec, ultrices urna. Curabitur ut
								ipsum et libero pretium viverra. Nullam sed lacus enim. Sed
								tincidunt tincidunt urna, in lacinia ipsum ullamcorper eu. Nunc
								tempus eget augue at interdum. Aliquam in maximus nisl. Duis
								accumsan venenatis dui, dignissim congue leo scelerisque in. Sed
								hendrerit efficitur viverra.
							</p>
							{/*Link*/}
							<Link href='/'>Read More</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default EventsComponent
