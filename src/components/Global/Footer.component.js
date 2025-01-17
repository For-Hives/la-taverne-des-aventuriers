import Image from 'next/image'
import Link from 'next/link'

const FooterComponent = () => {
	return (
		<div
			className='bg-FooterImage relative flex w-screen items-center justify-center bg-cover bg-center text-white'
			style={{ aspectRatio: '2653 / 1000' }}
		>
			<div className='absolute bottom-0 left-0 flex items-center justify-center mix-blend-color-burn'>
				<Image
					src='/assets/images/elements/cristals/rock1.png'
					alt='LTDA Logo'
					width={400}
					height={400}
				/>
			</div>

			{/* Text */}
			<div className='relative z-10 flex w-full max-w-7xl flex-col items-center justify-center gap-24 p-4 text-center text-base'>
				<div className='flex w-full flex-wrap items-start justify-around gap-8'>
					{/* First Column */}
					<div className='flex w-full max-w-xs flex-col items-center justify-center'>
						<h2 className='text-xl font-bold'>Le Bar :</h2>
						<Link className='hover:underline' href='#'>
							Carte
						</Link>
						<Link className='hover:underline' href='#'>
							Qui sommes-nous
						</Link>
						<Link className='hover:underline' href='#'>
							Évènements
						</Link>
						<Link className='hover:underline' href='#'>
							Ludothèque
						</Link>
					</div>

					{/* Second Column */}
					<div className='flex w-full max-w-xs flex-col items-center justify-center'>
						<h2 className='text-xl font-bold'>Support :</h2>
						<Link className='hover:underline' href='#'>
							Contact
						</Link>
						<Link className='hover:underline' href='#'>
							Réservations
						</Link>
					</div>

					{/* Third Column */}
					<div className='flex w-full max-w-xs flex-col items-center justify-center'>
						<h2 className='text-xl font-bold'>Réseaux Sociaux :</h2>
						<div className='flex space-x-4'>
							<div>Social 1</div>
							<div>Social 2</div>
							<div>Social 3</div>
						</div>
					</div>
				</div>

				<div className='flex w-full max-w-xs flex-col items-center justify-center'>
					<p className='mt-4 text-sm'>
						© 2025 Copyright, Tous droits réservés.
					</p>
				</div>
			</div>

			<div className='absolute bottom-0 right-0 flex items-center justify-center mix-blend-color-burn'>
				<Image
					src='/assets/images/elements/cristals/rock2.png'
					alt='LTDA Logo'
					width={300}
					height={300}
				/>
			</div>
		</div>
	)
}

export default FooterComponent
