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
		<nav className='fixed top-0 z-50 w-full lg:hidden'>
			{/* Header Bar */}
			<div className='relative z-50 mx-auto flex items-center justify-between bg-customWhite-100 px-4 py-3'>
				{/* Logo */}
				<Link href='/' aria-label='Home'>
					<Image
						src='/assets/images/LTDALogo.png'
						alt='Website Logo'
						width={50}
						height={50}
						priority
					/>
				</Link>

				{/* Menu Toggle Button */}
				<button
					onClick={() => setIsMenuOpen(!isMenuOpen)}
					className='focus:outline-none focus:ring-2 focus:ring-customBrown-100'
					aria-expanded={isMenuOpen}
					aria-label='Toggle navigation menu'
				>
					<FontAwesomeIcon
						icon={isMenuOpen ? faTimes : faBars}
						className='h-6 w-6 text-customBrown-100'
					/>
				</button>
			</div>

			{/* Mobile Menu Panel */}
			<div
				className={`fixed inset-0 bg-customWhite-100 transition-transform duration-300 ease-in-out ${
					isMenuOpen ? 'translate-x-0' : 'translate-x-full'
				} z-40`}
				aria-hidden={!isMenuOpen}
			>
				<div className='flex h-full flex-col items-center justify-center'>
					{/* Close Button */}
					<button
						className='absolute right-4 top-4 focus:outline-none focus:ring-2 focus:ring-customBrown-100'
						onClick={() => setIsMenuOpen(false)}
						aria-label='Close navigation menu'
					>
						<FontAwesomeIcon
							icon={faTimes}
							className='h-6 w-6 text-customBrown-100'
						/>
					</button>

					{/* Navigation Links */}
					<ul className='flex flex-col items-center space-y-6 font-obraletra text-lg text-customBrown-100'>
						{navItems.map(item => (
							<li key={item.id}>
								<Link
									href={item.url}
									onClick={() => setIsMenuOpen(false)}
									className='block px-4 py-2 hover:underline focus:outline-none focus:ring-2 focus:ring-customBrown-100'
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
