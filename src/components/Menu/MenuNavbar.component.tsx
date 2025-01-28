'use client'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { useState } from 'react'

// Utility function to combine class names conditionally
function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ') // Filters out falsy values and joins them into a string
}

// Array of tabs with their anchors and current state
export const tabs = [
	{ anchor: 'cocktails', current: false, name: 'Cocktails' },
	{ anchor: 'mocktails', current: false, name: 'Mocktails' },
	{ anchor: 'shooters', current: true, name: 'Shooters' },
	{ anchor: 'short-long-drinks', current: false, name: 'Short / Long Drinks' },
	{ anchor: 'beer-wine', current: false, name: 'Bières et Vins' },
	{ anchor: 'boards', current: false, name: 'Planches' },
	{ anchor: 'travelers', current: false, name: 'Plaisirs Voyageur' },
	{
		anchor: 'softs-hot-drinks',
		current: false,
		name: 'Softs et Boissons Chaudes',
	},
]

export default function MenuNavbar() {
	// Create state for the selected tab
	const [currentTab, setCurrentTab] = useState<string>('cocktails')

	// Handle click on tab
	const handleTabClick = (anchor: string) => {
		// Update the selected tab
		setCurrentTab(anchor)

		// Scroll smoothly to the targeted section on the page
		const target = document.getElementById(anchor)
		if (target) {
			target.scrollIntoView({ behavior: 'smooth', block: 'start' })
		}
	}

	return (
		<div className='p-16'>
			{/* Mobile view */}
			<div className='grid grid-cols-1 md:hidden'>
				<select
					aria-label='Select a tab' // Accessibility: label for the dropdown
					className='col-start-1 row-start-1 w-full appearance-none rounded-md bg-title-400 py-2 pl-3 pr-8 text-base text-title-200 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600'
					onChange={e => handleTabClick(e.target.value)} // Trigger handleTabClick on change
					value={currentTab} // Keep the selected tab visible
				>
					{/* Generate options for each tab */}
					{tabs.map(tab => (
						<option key={tab.name} value={tab.anchor}>
							{tab.name}
						</option>
					))}
				</select>
				{/* Dropdown arrow icon */}
				<ChevronDownIcon
					aria-hidden='true' // Hides the icon from screen readers
					className='pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-title-200'
				/>
			</div>

			{/* Desktop view */}
			<div className='hidden md:block'>
				<nav
					aria-label='Tabs' // Accessibility: label for the navigation
					className='isolate flex divide-x divide-title-500 rounded-lg shadow'
				>
					{/* Render each tab as a button */}
					{tabs.map((tab, tabIdx) => (
						<button
							key={tab.name}
							aria-current={currentTab === tab.anchor ? 'page' : undefined} // Accessibility: indicate which tab is active
							className={classNames(
								// Styling for the tab buttons
								tabIdx === 0 ? 'rounded-l-lg' : '',
								tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
								'group relative min-w-0 flex-1 overflow-hidden bg-title-400 px-4 py-4 text-center text-sm font-medium text-title-200 hover:bg-title-300 focus:z-10',
								currentTab === tab.anchor ? 'bg-title-300' : ''
							)}
							onClick={() => handleTabClick(tab.anchor)} // Trigger handleTabClick on click
						>
							<span>{tab.name}</span>
							{/* Bottom border indicating the selected tab */}
							<span
								aria-hidden='true'
								className={classNames(
									currentTab === tab.anchor ? 'bg-title-200' : 'bg-transparent',
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
