// Client side (for 'UseState, UseRef,...' effects if needed
'use client'

import Footer from '@/components/Footer'
import BackgroundVideoLP from '@/components/lp_Background_Video'
import Reservation_Card from '@/components/Reservation_Card'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'

// imports
import Navbar from '../components/Navbar.component.js'

// Landing Page
export default function Home() {
	return (
		// Page
		<div className='relative h-auto w-screen items-center justify-center'>
			{/*Navbar import*/}
			<Navbar />

			{/*Main part*/}
			<main className='absolute left-0 top-0 flex h-full w-full flex-col items-center gap-8 pt-20 sm:items-start'>
				{/*Hero + cards*/}
				<div className='flex w-full flex-col items-center gap-16'>
					{/*Hero section*/}
					<div className='flex h-screen w-screen flex-col items-start gap-16'>
						{/*Background Video (Imported from components)*/}
						<BackgroundVideoLP />

						{/*Text And CTA button div*/}
						<div className='bottom-0 left-0 flex flex-col items-start gap-10'>
							{/*Hero Title*/}
							<div>
								<h1 className='font-cardinal text-8xl font-bold text-title-200'>
									La taverne des
								</h1>
								<h2 className='font-cardinal text-8xl font-bold text-title-200 first-letter:text-title-100'>
									Aventuriers
								</h2>
							</div>

							<div className='flex flex-col items-start gap-9'>
								{/*Description*/}
								<div className='flex items-center gap-1'>
									<p className='font-kcobraletra text-2xl text-title-200'>
										Votre bar à{' '}
									</p>
									<p className='font-kcobraletra text-2xl text-title-100'>
										Jeux Nantais
									</p>
									<p className='font-kcobraletra text-2xl text-title-200'>
										favoris !
									</p>
								</div>

								{/*Button div*/}
								<div className='flex flex-wrap items-start gap-6'>
									{/*Button 1*/}
									<button className='flex items-center gap-4 rounded bg-title-200 p-2 font-kcobraletra text-xl text-title-300'>
										Servez-vous
										<FontAwesomeIcon
											icon={faChevronRight}
											className='text-title-300'
										/>
									</button>

									{/*Button 2*/}
									<button className='rounded border-3 border-solid border-title-200 p-1 font-kcobraletra text-xl text-title-200'>
										Découvrez nos Jeux
									</button>
								</div>
							</div>
						</div>
					</div>

					{/*Events and Cards Div*/}
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
										Lorem ipsum dolor sit amet, consectetur adipiscing elit.
										Nulla ut turpis dictum, feugiat justo nec, ultrices urna.
										Curabitur ut ipsum et libero pretium viverra. Nullam sed
										lacus enim. Sed tincidunt tincidunt urna, in lacinia ipsum
										ullamcorper eu. Nunc tempus eget augue at interdum. Aliquam
										in maximus nisl. Duis accumsan venenatis dui, dignissim
										congue leo scelerisque in. Sed hendrerit efficitur viverra.
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
											Lorem ipsum dolor sit amet, consectetur adipiscing elit.
											Nulla ut turpis dictum, feugiat justo nec, ultrices urna.
											Curabitur ut ipsum et libero pretium viverra. Nullam sed
											lacus enim. Sed tincidunt tincidunt urna, in lacinia ipsum
											ullamcorper eu. Nunc tempus eget augue at interdum.
											Aliquam in maximus nisl. Duis accumsan venenatis dui,
											dignissim congue leo scelerisque in. Sed hendrerit
											efficitur viverra.
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
											Lorem ipsum dolor sit amet, consectetur adipiscing elit.
											Nulla ut turpis dictum, feugiat justo nec, ultrices urna.
											Curabitur ut ipsum et libero pretium viverra. Nullam sed
											lacus enim. Sed tincidunt tincidunt urna, in lacinia ipsum
											ullamcorper eu. Nunc tempus eget augue at interdum.
											Aliquam in maximus nisl. Duis accumsan venenatis dui,
											dignissim congue leo scelerisque in. Sed hendrerit
											efficitur viverra.
										</p>
										{/*Link*/}
										<Link href='/'>Read More</Link>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/*Who are We Section*/}
					<div className='flex w-3/4 items-center gap-16 rounded-lg bg-gray-400'>
						{/*Image*/}
						<Image
							src='/assets/images/vinbiere.png'
							alt='Vinbieres'
							width={300}
							height={300}
						/>
						{/*Text*/}
						<div className='w-1/2'>
							{/*title*/}
							<h2>{`D'où vient notre renom ?`}</h2>
							{/*Description*/}
							<p>Lorem ipsum</p>
							{/*Link*/}
							<Link href='/'>Read More</Link>
						</div>
					</div>
				</div>

				{/*Reservation CTA Card (Imported from Components)*/}
				<Reservation_Card />

				{/*Footer (Imported from Components)*/}
				<Footer />
			</main>
		</div>
	)
}
