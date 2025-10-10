'use client'

// Importing necessary modules
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { useState, useEffect } from 'react'

// Utility function to combine class names conditionally
function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ')
}

// Array of tabs with their anchors and current state
// Each tab represents a section in the menu
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

export default function MenuNavbar() {
	// State to track the current selected tab
	const [currentTab, setCurrentTab] = useState<string>('cocktails')
	// State to show/hide navbar based on scroll direction
	const [showNavbar, setShowNavbar] = useState<boolean>(true)
	// State to store the last known scroll position
	const [lastScrollY, setLastScrollY] = useState<number>(0)

	// Function to handle tab clicks
	// Sets the current tab and scrolls smoothly to the corresponding section
	const handleTabClick = (anchor: string) => {
		setCurrentTab(anchor)
		const target = document.getElementById(anchor)
		if (target) {
			target.scrollIntoView({ behavior: 'smooth', block: 'start' })
		}
	}

	// Effect to handle scroll behavior
	// Shows/hides navbar based on the scroll direction
	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY
			if (currentScrollY > lastScrollY) {
				setShowNavbar(false) // Hide navbar when scrolling down
			} else {
				setShowNavbar(true) // Show navbar when scrolling up
			}
			setLastScrollY(currentScrollY)
		}

		// Attach scroll event listener
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [lastScrollY])

	return (
		<div
			className={classNames(
				'transition-transform duration-300',
				showNavbar ? 'translate-y-0' : '-translate-y-full' // Navbar slides in/out based on scroll direction
			)}
		>
			{/* Mobile view */}
			<div className='grid grid-cols-1 p-16 lg:hidden'>
				<select
					aria-label='Select a tab' // Accessibility label
					className='bg-custom-white-200 text-custom-brown-100 col-start-1 row-start-1 w-full appearance-none rounded-md py-2 pr-8 pl-3 text-base outline-1 -outline-offset-1 outline-gray-300 outline-solid focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 focus:outline-solid'
					onChange={e => handleTabClick(e.target.value)}
					value={currentTab} // Sync current tab with select value
				>
					{/* Render each tab as an option */}
					{tabs.map(tab => (
						<option key={tab.name} value={tab.anchor}>
							{tab.name}
						</option>
					))}
				</select>
				{/* Icon for dropdown */}
				<ChevronDownIcon
					aria-hidden='true'
					className='fill-custom-brown-100 pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end'
				/>
			</div>

			{/* Desktop view */}
			<div className='hidden p-16 lg:block'>
				<nav
					aria-label='Tabs' // Accessibility label
					className='divide-custom-brown-transparent-100 isolate flex divide-x rounded-lg shadow-sm'
				>
					{/* Render each tab as a button */}
					{tabs.map((tab, tabIdx) => (
						<button
							key={tab.name}
							aria-current={currentTab === tab.anchor ? 'page' : undefined} // Highlight the current tab for accessibility
							className={classNames(
								tabIdx === 0 ? 'rounded-l-lg' : '', // Round left edges for the first tab
								tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '', // Round right edges for the last tab
								'group bg-custom-white-200 text-custom-brown-100 hover:bg-custom-white-100 relative min-w-0 flex-1 overflow-hidden px-4 py-4 text-center text-sm font-medium focus:z-10',
								currentTab === tab.anchor ? 'bg-custom-white-100' : '' // Highlight the current tab
							)}
							onClick={() => handleTabClick(tab.anchor)}
						>
							<span>{tab.name}</span>
							{/* Indicator line for active tab */}
							<span
								aria-hidden='true'
								className={classNames(
									currentTab === tab.anchor
										? 'bg-custom-brown-100' // Active indicator color
										: 'bg-transparent', // Inactive indicator
									'absolute inset-x-0 bottom-0 h-0.5'
								)}
							/>
						</button>
					))}
				</nav>
			</div>
		</div>
	)
}
