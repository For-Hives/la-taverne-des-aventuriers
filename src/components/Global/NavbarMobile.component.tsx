'use client'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function MobileNavbar() {
	// State to manage the mobile menu visibility
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	return (
		<nav className='fixed top-0 z-50 w-full lg:hidden'>
			{/* Navbar container */}
			<div className='relative z-50 mx-auto flex items-center justify-between bg-customWhite-100 px-4 py-3'>
				{/* Logo */}
				<div>
					<Link href='/'>
						<Image
							src='/assets/images/LTDALogo.png'
							alt='LTDA Logo'
							width={50}
							height={50}
						/>
					</Link>
				</div>

				{/* Hamburger icon */}
				<button
					onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggles the menu visibility
					aria-label='Toggle Menu'
				>
					<FontAwesomeIcon
						icon={isMenuOpen ? faTimes : faBars} // Switch between 'X' and 'Hamburger' icon based on menu state
						className='h-6 w-6 text-customBrown-100'
					/>
				</button>
			</div>

			{/* Fullscreen mobile menu */}
			<div
				className={`fixed inset-0 bg-customWhite-100 transition-transform duration-300 ease-in-out ${
					isMenuOpen ? 'translate-x-0' : 'translate-x-full'
				} z-40`} // Menu moves from the right when open
			>
				<div className='flex h-full flex-col items-center justify-center'>
					{/* Close button */}
					<button
						className='absolute right-4 top-4'
						onClick={() => setIsMenuOpen(false)} // Closes the menu when clicked
						aria-label='Close Menu'
					>
						<FontAwesomeIcon
							icon={faTimes}
							className='h-6 w-6 text-customBrown-100'
						/>
					</button>

					{/* Menu links */}
					<ul className='flex flex-col items-center space-y-6 font-obraletra text-lg text-customBrown-100'>
						<li>
							<Link href='/WhoAreWe' onClick={() => setIsMenuOpen(false)}>
								{' '}
								{/* Close menu when link is clicked */}
								Who Are We
							</Link>
						</li>
						<li>
							<Link href='/menu' onClick={() => setIsMenuOpen(false)}>
								Menu
							</Link>
						</li>
						<li>
							<Link href='/gamelibrary' onClick={() => setIsMenuOpen(false)}>
								Game Library
							</Link>
						</li>
						<li>
							<Link href='/events' onClick={() => setIsMenuOpen(false)}>
								Events
							</Link>
						</li>
						<li>
							<Link href='/reservation' onClick={() => setIsMenuOpen(false)}>
								Reservation
							</Link>
						</li>
						<li>
							<Link href='/contacts' onClick={() => setIsMenuOpen(false)}>
								Contact
							</Link>
						</li>
					</ul>
				</div>
			</div>

			{/* Overlay to block interaction with the background content */}
			{isMenuOpen && (
				<button
					className='fixed inset-0 z-30 bg-black opacity-50'
					onClick={() => setIsMenuOpen(false)} // Close the menu when overlay is clicked
					aria-label='Close Menu'
					tabIndex={0} // Allows keyboard navigation
				></button>
			)}
		</nav>
	)
}
