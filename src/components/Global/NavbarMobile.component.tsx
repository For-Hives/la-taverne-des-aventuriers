'use client'

/**
 * Mobile Navigation Component
 */
import { NavBarData } from '@/app/actions/services/getNavData.service'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface MobileNavbarProps {
	navItems: NavBarData
}

export default function MobileNavbar({ navItems }: MobileNavbarProps) {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	return (
		<nav className='fixed top-0 z-50 w-full xl:hidden'>
			{/* Header Bar */}
			<div className='border-custom-brown-100 bg-custom-white-100 relative z-50 mx-auto flex items-center justify-between border-b px-4 py-3'>
				{/* Logo */}
				<Link href='/' aria-label='Home'>
					<Image
						src='/assets/images/LTDALogo.webp'
						alt='Website Logo'
						width={50}
						height={50}
						priority
					/>
				</Link>

				<h2 className='font-cardinal text-custom-brown-100 first-letter:text-custom-red-100 flex md:text-lg'>
					La Taverne des Aventuriers
				</h2>

				{/* Menu Toggle Button */}
				<button
					onClick={() => setIsMenuOpen(!isMenuOpen)}
					className='focus:ring-custom-brown-100 focus:ring-2 focus:outline-hidden'
					aria-expanded={isMenuOpen}
					aria-label='Toggle navigation menu'
				>
					<FontAwesomeIcon
						icon={isMenuOpen ? faTimes : faBars}
						className='text-custom-brown-100 h-6 w-6'
					/>
				</button>
			</div>

			{/* Mobile Menu Panel */}
			<div
				className={`bg-custom-white-100 fixed inset-0 transition-transform duration-300 ease-in-out ${
					isMenuOpen ? 'translate-x-0' : 'translate-x-full'
				} z-40`}
				aria-hidden={!isMenuOpen}
			>
				<div className='flex h-full flex-col items-center justify-center'>
					{/* Close Button */}
					<button
						className='focus:ring-custom-brown-100 absolute top-4 right-4 focus:ring-2 focus:outline-hidden'
						onClick={() => setIsMenuOpen(false)}
						aria-label='Close navigation menu'
					>
						<FontAwesomeIcon
							icon={faTimes}
							className='text-custom-brown-100 h-6 w-6'
						/>
					</button>

					{/* Navigation Links */}
					<ul className='font-obraletra text-custom-brown-100 flex flex-col items-center space-y-6 text-lg'>
						{navItems.map(item => (
							<li key={item.id}>
								<Link
									href={item.url}
									onClick={() => setIsMenuOpen(false)}
									className='focus:ring-custom-brown-100 block px-4 py-2 hover:underline focus:ring-2 focus:outline-hidden'
								>
									{item.label}
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>

			{/* Background Overlay */}
			{isMenuOpen && (
				<button
					className='fixed inset-0 z-30 bg-black opacity-50'
					onClick={() => setIsMenuOpen(false)}
					aria-label='Close menu overlay'
					tabIndex={-1}
				/>
			)}
		</nav>
	)
}
