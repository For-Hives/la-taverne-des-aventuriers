import Navbar from '../components/Navbar.component.js';

export default function Home() {
	return (
		<div className='relative w-full h-screen items-center justify-center'>
			<Navbar />

			<main className='w-full h-full flex flex-col items-center gap-8 pt-20 sm:items-start'>
				<div className='w-full flex flex-col items-center gap-16'>
					{/*<video*/}
					{/*	className='w-full flex flex-col items-center gap-16'*/}
					{/*	src="/assets/videos/AnimationCarte.mp4"*/}
					{/*	autoPlay*/}
					{/*	loop*/}
					{/*	muted*/}
					{/*/>*/}
				</div>
			</main>
		</div>
	);
}
