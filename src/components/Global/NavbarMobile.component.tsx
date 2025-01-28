import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
	return (
		<nav className='fixed top-2 z-50 flex w-full max-lg:hidden'>
			{/* Navbar container with centered content */}
			<div className='bg-customWhite-100 mx-auto flex w-full max-w-5xl items-center justify-evenly rounded px-4 py-3'>
				{/* List of navigation items */}
				<ul className='text-customBrown-100 flex items-center gap-16 space-x-6 font-obraletra text-sm'>
					{/* Logo Link */}
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
					{/* "Who Are We" Link */}
					<li>
						<Link href='/WhoAreWe' className='hover:underline'>
							Qui Sommes-nous
						</Link>
					</li>
					{/* "Menu" Link */}
					<li>
						<Link href='/menu' className='hover:underline'>
							Carte
						</Link>
					</li>
					{/* "Game Library" Link */}
					<li>
						<Link href='/gamelibrary' className='hover:underline'>
							Ludothèque
						</Link>
					</li>
					{/* "Events" Link */}
					<li>
						<Link href='/events' className='hover:underline'>
							Evènements
						</Link>
					</li>
					{/* "Reservation" Link */}
					<li>
						<Link href='/reservation' className='hover:underline'>
							Réservation
						</Link>
					</li>
					{/* "Contact" Link */}
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
