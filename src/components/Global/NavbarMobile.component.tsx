'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function MobileNavbar() {
	const [isOpen, setIsOpen] = useState(false)

	const navLinks = [
		{ href: '/WhoAreWe', label: 'Qui Sommes-nous' },
		{ href: '/menu', label: 'Carte' },
		{ href: '/gamelibrary', label: 'Ludothèque' },
		{ href: '/events', label: 'Evènements' },
		{ href: '/reservation', label: 'Réservation' },
		{ href: '/contacts', label: 'Contact' },
	]

	return (
		<nav className='fixed top-0 z-50 w-full lg:hidden'>
			{/* Navbar Container */}
			<div className='mx-auto flex w-full max-w-5xl items-center justify-between rounded bg-title-300 px-4 py-3'>
				{/* Logo */}
				<Link href='/' className='relative z-50'>
					<Image
						src='/assets/images/LTDALogo.png'
						alt='LTDA Logo'
						width={50}
						height={50}
						className='h-12 w-12'
					/>
				</Link>

				{/* Hamburger Button */}
				<button
					onClick={() => setIsOpen(!isOpen)}
					className='relative z-50 h-10 w-10 focus:outline-none'
				>
					<div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform'>
						<span
							className={`absolute h-0.5 w-6 transform bg-title-200 transition duration-300 ease-in-out ${
								isOpen ? 'rotate-45' : '-translate-y-1.5'
							}`}
						/>
						<span
							className={`absolute h-0.5 w-6 bg-title-200 transition-opacity duration-300 ${
								isOpen ? 'opacity-0' : 'opacity-100'
							}`}
						/>
						<span
							className={`absolute h-0.5 w-6 transform bg-title-200 transition duration-300 ease-in-out ${
								isOpen ? '-rotate-45' : 'translate-y-1.5'
							}`}
						/>
					</div>
				</button>

				{/* Mobile Menu */}
				<div
					className={`fixed inset-0 z-40 transform bg-title-300 transition-transform duration-300 ease-in-out ${
						isOpen ? 'translate-x-0' : 'translate-x-full'
					}`}
				>
					{/* Menu Items */}
					<div className='flex h-full flex-col items-center justify-center'>
						<ul className='space-y-8 text-center'>
							{navLinks.map(link => (
								<li key={link.href}>
									<Link
										href={link.href}
										onClick={() => setIsOpen(false)}
										className='font-obraletra text-xl text-title-200 transition-colors duration-200 hover:text-title-100'
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</nav>
	)
}
