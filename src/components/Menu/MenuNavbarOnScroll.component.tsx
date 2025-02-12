'use client'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useState, useEffect } from 'react'

// Array of tabs with their anchors and current state
export const tabs = [
	{ anchor: 'cocktails', current: false, name: 'Cocktails' },
	{ anchor: 'mocktails', current: false, name: 'Mocktails' },
	{ anchor: 'shooters', current: true, name: 'Shooters' },
	{ anchor: 'short-long-drinks', current: false, name: 'Short / Long Drinks' },
	{ anchor: 'beer-wine', current: false, name: 'Bières et Vins' },
	{ anchor: 'planches', current: false, name: 'Planches' },
	{ anchor: 'travelers', current: false, name: 'Plaisirs Voyageur' },
	{
		anchor: 'softs-hot-drinks',
		current: false,
		name: 'Softs et Boissons Chaudes',
	},
]

export default function MenuNavbarOnScroll() {
	// State to manage the visibility of the button and menu toggle
	const [isVisible, setIsVisible] = useState(false)
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	// Effect to handle scroll and toggle the visibility of the button
	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 300) {
				setIsVisible(true)
			} else {
				setIsVisible(false)
			}
		}

		window.addEventListener('scroll', handleScroll)
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

	return (
		isVisible && (
			<nav className='fixed left-4 top-2 z-50 rounded-full bg-customWhite-400 p-2 text-customBrown-100 opacity-90 shadow-lg transition-all duration-300 ease-in-out hover:bg-customBrown-100 hover:opacity-100 max-lg:top-20 sm:left-6 group'>
				{/* Hamburger icon */}
				<button
					onClick={toggleMenu}
					aria-label='Toggle Menu'
					className='group-hover:bg-customBrown-300 flex h-10 w-10 items-center justify-center rounded-full text-customBrown-100 transition-all duration-300 ease-in-out group-hover:text-customWhite-300 focus:outline-none'
				>
					<FontAwesomeIcon
						icon={isMenuOpen ? faTimes : faBars}
						className='group-hover:text-customBrown-300 h-6 w-6 transition-colors duration-200 ease-in-out'
					/>
				</button>

				{/* Dropdown menu */}
				<div
					className={`absolute left-0 top-16 min-w-max transform rounded-md bg-customWhite-100 shadow-lg transition-all duration-500 ease-in-out ${isMenuOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}
				>
					<ul className='flex flex-col items-center space-y-4 font-obraletra text-lg text-customBrown-100'>
						{tabs.map(tab => (
							<li key={tab.anchor} className='w-full'>
								{/* Make Link fill the entire space of the li */}
								<Link
									href={`#${tab.anchor}`}
									onClick={() => setIsMenuOpen(false)}
									className='group-hover:text-customBrown-300 block w-full px-4 py-2 transition-colors duration-200 ease-in-out'
								>
									{tab.name}
								</Link>
							</li>
						))}
					</ul>
				</div>
			</nav>
		)
	)
}
