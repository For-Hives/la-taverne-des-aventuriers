import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
	return (
		<nav className='fixed top-2 z-50 flex w-full max-lg:hidden'>
			<div className='mx-auto flex w-full max-w-5xl items-center justify-evenly rounded bg-title-300 px-4 py-3'>
				<ul className='flex items-center gap-16 space-x-6 font-obraletra text-sm text-title-200'>
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
					<li>
						<Link href='/WhoAreWe' className='hover:underline'>
							Qui Sommes-nous
						</Link>
					</li>
					<li>
						<Link href='/menu' className='hover:underline'>
							Carte
						</Link>
					</li>
					<li>
						<Link href='/gamelibrary' className='hover:underline'>
							Ludothèque
						</Link>
					</li>
					<li>
						<Link href='/events' className='hover:underline'>
							Evènements
						</Link>
					</li>
					<li>
						<Link href='/reservation' className='hover:underline'>
							Réservation
						</Link>
					</li>
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

export default Navbar
