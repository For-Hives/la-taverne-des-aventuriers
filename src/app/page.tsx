import Navbar from '../components/Navbar.component.js'

export default function Home() {
	return (
		<div className='grid min-h-screen grid-rows-[auto_1fr_auto] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20'>
			<Navbar />
			<main className='row-start-2 flex flex-col items-center gap-8 sm:items-start'>
				test
			</main>
		</div>
	)
}
