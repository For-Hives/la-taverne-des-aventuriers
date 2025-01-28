import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
	return (
		<nav className='fixed top-2 z-50 flex w-full max-lg:hidden'>
			<div className='mx-auto flex w-full max-w-5xl items-center justify-evenly rounded bg-title-300 px-4 py-3'>
				{/* Navigation links container */}
				<ul className='flex items-center gap-16 space-x-6 font-obraletra text-sm text-title-200'>
					{/* Logo link */}
					<li>
						<Link href='/'>
							<Image
								src='/assets/images/LTDALogo.png'
								alt='LTDA Logo'
								width={50}
								height={50}
							/>
						</Link>
					</li>

					{/* "Qui Sommes-nous" link */}
					<li>
						<Link href='/WhoAreWe' className='hover:underline'>
							Qui Sommes-nous
						</Link>
					</li>

					{/* "Carte" link */}
					<li>
						<Link href='/menu' className='hover:underline'>
							Carte
						</Link>
					</li>

					{/* "Ludothèque" link */}
					<li>
						<Link href='/gamelibrary' className='hover:underline'>
							Ludothèque
						</Link>
					</li>

					{/* "Evènements" link */}
					<li>
						<Link href='/events' className='hover:underline'>
							Evènements
						</Link>
					</li>

					{/* "Réservation" link */}
					<li>
						<Link href='/reservation' className='hover:underline'>
							Réservation
						</Link>
					</li>

					{/* "Contact" link */}
					<li>
						<Link href='/contacts' className='hover:underline'>
							Contact
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	)
}
