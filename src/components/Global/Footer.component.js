import Link from 'next/link'

const FooterComponent = () => {
	return (
		<div className='flex w-full items-center justify-center bg-gray-700 text-white'>
			<div className='flex w-full max-w-2xl flex-col items-center justify-center p-4'>
				<div className='flex-block flex w-full items-center justify-center'>
					<div className='flex w-full flex-col items-center justify-center'>
						<h2>Le Bar :</h2>
						<Link href='#'>Carte</Link>
						<Link href='#'>Qui sommes-nous</Link>
						<Link href='#'>Evènements</Link>
						<Link href='#'>Ludothèque</Link>
					</div>
					<div className='flex w-full flex-col items-center justify-center'>
						<h2>Support :</h2>
						<Link href='#'>Contact</Link>
						<Link href='#'>Réservations</Link>
					</div>
					<div className='flex w-full flex-col items-center justify-center'>
						<h2>Réseaux Sociaux :</h2>
						<div className='flex-block flex w-full items-center justify-center'>
							<div>socials 1</div>
							<div>socials 2</div>
							<div>socials 3</div>
						</div>
					</div>
				</div>
				<p>copyright..............</p>
			</div>
		</div>
	)
}

export default FooterComponent
