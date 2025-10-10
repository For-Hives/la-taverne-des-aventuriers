'use client'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useEffect, useState } from 'react'

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
			<nav className="group bg-custom-white-400 text-custom-brown-100 hover:bg-custom-brown-100 fixed top-2 left-4 z-50 rounded-full p-2 opacity-90 shadow-lg transition-all duration-300 ease-in-out hover:opacity-100 max-lg:top-20 sm:left-6">
				{/* Hamburger icon */}
				<button
					type="button"
					onClick={toggleMenu}
					aria-label="Toggle Menu"
					className="group-hover:bg-customBrown-300 text-custom-brown-100 group-hover:text-custom-white-300 flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ease-in-out focus:outline-hidden"
				>
					<FontAwesomeIcon
						icon={isMenuOpen ? faTimes : faBars}
						className="group-hover:text-customBrown-300 h-6 w-6 transition-colors duration-200 ease-in-out"
					/>
				</button>

				{/* Dropdown menu */}
				<div
					className={`bg-custom-white-100 absolute top-16 left-0 min-w-max transform rounded-md shadow-lg transition-all duration-500 ease-in-out ${isMenuOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}
				>
					<ul className="font-obraletra text-custom-brown-100 flex flex-col items-center space-y-4 text-lg">
						{tabs.map(tab => (
							<li key={tab.anchor} className="w-full">
								{/* Make Link fill the entire space of the li */}
								<Link
									href={`#${tab.anchor}`}
									onClick={() => setIsMenuOpen(false)}
									className="group-hover:text-customBrown-300 block w-full px-4 py-2 transition-colors duration-200 ease-in-out"
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
