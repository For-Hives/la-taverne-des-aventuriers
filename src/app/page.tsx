import Navbar from '../components/Navbar.component.js';
import Reservation_Card from "@/components/Reservation_Card";
import Footer from "@/components/Footer";

export default function Home() {
	return (
		<div className='relative w-full h-screen items-center justify-center'>
			<Navbar />

			<main className='w-full h-full flex flex-col items-center gap-8 pt-20 sm:items-start'>
				<div className='w-full flex flex-col items-left gap-16'>

					{/*<video*/}
					{/*	className='w-full flex flex-col items-center gap-16'*/}
					{/*	src="/assets/videos/AnimationCarte.mp4"*/}
					{/*	autoPlay*/}
					{/*	loop*/}
					{/*	muted*/}
					{/*/>*/}

					<div className='inline-block flex flex-col items-start gap-0'>
						<h1 className='text-2xl font-bold first-letter:text-red-500 text-gray-900'>La taverne des
							aventuriers</h1>
						<p className='text-gray-700'>Votre bar à jeux Nantais favoris !</p>

						<div className='flex flex-wrap items-start gap-2'>
							<button className='text-gray-700 bg-amber-400'>
								test
							</button>
							<button className='text-gray-700 bg-amber-400'>
								test
							</button>
						</div>
					</div>

					<div>
						<h1>Oyez Oyez ! Découvrez nos Eènements récents !</h1>
						<div>
							<div>
								card 1
							</div>
							<div>
								<div>
									card 2
								</div>
								<div>
									card 3
								</div>
							</div>
						</div>
					</div>

					<div>
						<img/>
						<div>
							<h2>D'où vient notre renom ?</h2>
							<p>Lorem ipsum</p>
						</div>
					</div>
				</div>

				<Reservation_Card />

			</main>

			<Footer />

		</div>
	);
}
