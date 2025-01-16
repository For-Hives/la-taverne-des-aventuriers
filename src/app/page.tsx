// Client side (for 'UseState, UseRef,...' effects if needed
"use client"

// imports
import Navbar from '../components/Navbar.component.js';
import Reservation_Card from "@/components/Reservation_Card";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import BackgroundVideoLP from "@/components/lp_Background_Video";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faChevronRight, faWineBottle} from "@fortawesome/free-solid-svg-icons";


// Landing Page
export default function Home() {
	return (
		// Page
		<div className='relative w-screen h-auto items-center justify-center'>

			{/*Navbar import*/}
			<Navbar/>

			{/*Main part*/}
			<main className='absolute left-0 top-0 w-full h-full flex flex-col items-center gap-8 pt-20 sm:items-start'>
				{/*Hero + cards*/}
				<div className='w-full flex flex-col items-center gap-16'>
					{/*Hero section*/}
					<div className='flex flex-col w-screen h-screen items-start gap-16 '>

						{/*Background Video (Imported from components)*/}
						<BackgroundVideoLP/>

						{/*Text And CTA button div*/}
						<div className='left-0 bottom-0 flex flex-col items-start gap-10'>

							{/*Hero Title*/}
							<div>
								<h1 className='font-cardinal text-8xl font-bold text-title-200'>La taverne des</h1>
								<h2 className='font-cardinal text-8xl font-bold first-letter:text-title-100 text-title-200'>Aventuriers</h2>
							</div>

							<div className='flex flex-col items-start gap-9'>
								{/*Description*/}
								<div className='flex items-center gap-1'>
									<p className='text-2xl font-kcobraletra text-title-200'>Votre bar à </p>
									<p className='text-2xl font-kcobraletra text-title-100'>Jeux Nantais</p>
									<p className='text-2xl font-kcobraletra text-title-200'>favoris !</p>
								</div>


								{/*Button div*/}
								<div className='flex flex-wrap items-start gap-6'>
									{/*Button 1*/}
									<button className='flex items-center gap-4 p-2 font-kcobraletra text-xl text-title-300 bg-title-200 rounded'>
										Servez-vous
										<FontAwesomeIcon icon={faChevronRight} className='text-title-300'/>
									</button>

									{/*Button 2*/}
									<button
										className='font-kcobraletra p-1 text-xl text-title-200 border-3 border-solid border-title-200 rounded '>
										Découvrez nos Jeux
									</button>
								</div>
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

				{/*Footer (Imported from Components)*/}
				<Footer/>
			</main>
		</div>
	);
}
