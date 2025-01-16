// Client side (for 'UseState, UseRef,...' effects if needed
"use client"

// imports
import Navbar from '../components/Navbar.component.js';
import Reservation_Card from "@/components/Reservation_Card";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import BackgroundVideoLP from "@/components/lp_Background_Video";


// Landing Page
export default function Home() {
	return (
		// Page
		<div className='relative w-screen h-auto items-center justify-center'>

			{/*Navbar import*/}
			<Navbar/>

			{/*Main part*/}
			<main className='w-full h-full flex flex-col items-center gap-8 pt-20 sm:items-start'>
				{/*Hero + cards*/}
				<div className='w-full flex flex-col items-center gap-16'>
					{/*Hero section*/}
					<div className='flex flex-col w-screen h-screen items-start gap-16 '>

						{/*Background Video (Imported from components)*/}
						<BackgroundVideoLP/>

						{/*Text And CTA button div*/}
						<div className='flex flex-col items-start gap-0'>
							{/*Hero Title*/}
							<h1 className='text-2xl font-bold first-letter:text-red-500 text-gray-900'>La taverne des
								aventuriers</h1>
							{/*Description*/}
							<p className='text-gray-700'>Votre bar à jeux Nantais favoris !</p>

							{/*Button div*/}
							<div className='flex flex-wrap items-start gap-2'>
								{/*Button 1*/}
								<button className='text-gray-700 bg-amber-400'>
									test
								</button>
								{/*Button 2*/}
								<button className='text-gray-700 bg-amber-400'>
									test
								</button>
							</div>
						</div>
					</div>

					{/*Events and Cards Div*/}
					<div className='flex flex-col w-3/4 h-screen items-start gap-16 bg-gray-400 rounded-lg'>

						{/*Title*/}
						<h1 className='text-gray-700'>Oyez Oyez ! Découvrez nos Eènements récents !</h1>

						{/*Layout Event cards Div*/}
						<div className='w-full h-full flex items-start gap-2'>

							{/*Fist Card Div (One Half of the max-width) + Background image "bg-lp-card1-bg bg-cover bg-center"*/}
							<div className='w-1/2 h-full flex flex-wrap items-start gap-2 bg-lp-card1-bg bg-cover bg-center text-gray-700 rounded-lg'>
								{/*Text Div*/}
								<div className='bottom-0 left-0 gap-2'>
									{/*Title*/}
									<h1>Nouveau Cocktail !</h1>
									{/*Date*/}
									<h3>13/01/2025</h3>
									{/*Description*/}
									<p>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut turpis dictum,
										feugiat justo nec,
										ultrices urna. Curabitur ut ipsum et libero pretium viverra. Nullam sed lacus
										enim.
										Sed tincidunt tincidunt urna, in lacinia ipsum ullamcorper eu. Nunc tempus eget
										augue at interdum.
										Aliquam in maximus nisl. Duis accumsan venenatis dui, dignissim congue leo
										scelerisque in.
										Sed hendrerit efficitur viverra.
									</p>
									{/*Link*/}
									<Link href='/'>Read More</Link>
								</div>
							</div>

							{/*Second Half Event Cards */}
							<div className='w-1/2 h-full flex flex-col items-start gap-2 text-gray-700'>

								{/*Second Card*/}
								<div className='w-full h-1/2 flex flex-wrap items-start gap-2 bg-lp-card2-bg rounded-lg'>
									{/*Text Div*/}
									<div className='bottom-0 left-0 gap-2'>
										{/*Title*/}
										<h1>Nouveau Cocktail !</h1>
										{/*Date*/}
										<h3>13/01/2025</h3>
										{/*Description*/}
										<p>
											Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut turpis
											dictum,
											feugiat justo nec,
											ultrices urna. Curabitur ut ipsum et libero pretium viverra. Nullam sed
											lacus
											enim.
											Sed tincidunt tincidunt urna, in lacinia ipsum ullamcorper eu. Nunc tempus
											eget
											augue at interdum.
											Aliquam in maximus nisl. Duis accumsan venenatis dui, dignissim congue leo
											scelerisque in.
											Sed hendrerit efficitur viverra.
										</p>
										{/*Link*/}
										<Link href='/'>Read More</Link>
									</div>
								</div>

								{/*Third Card Div*/}
								<div className='w-full h-1/2 flex flex-col items-start gap-2 text-gray-700 bg-lp-card3-bg rounded-lg'>
									{/*Text*/}
									<div className='bottom-0 left-0 gap-2'>
										{/*Title*/}
										<h1>Nouveau Cocktail !</h1>
										{/*Date*/}
										<h3>13/01/2025</h3>
										{/*Description*/}
										<p>
											Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut turpis
											dictum,
											feugiat justo nec,
											ultrices urna. Curabitur ut ipsum et libero pretium viverra. Nullam sed
											lacus
											enim.
											Sed tincidunt tincidunt urna, in lacinia ipsum ullamcorper eu. Nunc tempus
											eget
											augue at interdum.
											Aliquam in maximus nisl. Duis accumsan venenatis dui, dignissim congue leo
											scelerisque in.
											Sed hendrerit efficitur viverra.
										</p>
										{/*Link*/}
										<Link href='/'>Read More</Link>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/*Who are We Section*/}
					<div className='w-3/4 flex items-center gap-16 bg-gray-400 rounded-lg'>
						{/*Image*/}
						<Image src="/assets/images/vinbiere.png" alt="Vinbieres" width={300} height={300}/>
						{/*Text*/}
						<div className='w-1/2'>
							{/*title*/}
							<h2>D'où vient notre renom ?</h2>
							{/*Description*/}
							<p>Lorem ipsum</p>
							{/*Link*/}
							<Link href='/'>Read More</Link>
						</div>
					</div>
				</div>

				{/*Reservation CTA Card (Imported from Components)*/}
				<Reservation_Card/>

			</main>

			{/*Footer (Imported from Components)*/}
			<Footer/>

		</div>
	);
}
