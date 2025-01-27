'use client'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { useState } from 'react'

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ')
}

export const tabs = [
	{ anchor: 'cocktails', current: false, name: 'Cocktails' },
	{ anchor: 'mocktails', current: false, name: 'Mocktails' },
	{ anchor: 'shooters', current: true, name: 'Shooters' },
	{ anchor: 'short-long-drinks', current: false, name: 'Short / Long Drinks' },
	{ anchor: 'beer-wine', current: false, name: 'Bièrres et Vins' },
	{ anchor: 'boards', current: false, name: 'Planche' },
	{
		anchor: 'softs-hot-drinks',
		current: false,
		name: 'Softs et Boissons Chaudes',
	},
]

export default function MenuNavbar() {
	// Créer un état pour l'onglet sélectionné
	const [currentTab, setCurrentTab] = useState<string>('shooters')

	const handleTabClick = (anchor: string) => {
		// Mettre à jour l'onglet sélectionné
		setCurrentTab(anchor)

		// Faire défiler la page jusqu'à l'élément ciblé
		const target = document.getElementById(anchor)
		if (target) {
			target.scrollIntoView({ behavior: 'smooth', block: 'start' })
		}
	}

	return (
		<div className='p-16'>
			<div className='grid grid-cols-1 md:hidden'>
				<select
					aria-label='Select a tab'
					className='col-start-1 row-start-1 w-full appearance-none rounded-md bg-title-400 py-2 pl-3 pr-8 text-base text-title-200 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600'
					onChange={e => handleTabClick(e.target.value)}
					value={currentTab} // Garder l'onglet sélectionné visible
				>
					{tabs.map(tab => (
						<option key={tab.name} value={tab.anchor}>
							{tab.name}
						</option>
					))}
				</select>
				<ChevronDownIcon
					aria-hidden='true'
					className='pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-title-200'
				/>
			</div>
			<div className='hidden md:block'>
				<nav
					aria-label='Tabs'
					className='isolate flex divide-x divide-title-500 rounded-lg shadow'
				>
					{tabs.map((tab, tabIdx) => (
						<button
							key={tab.name}
							aria-current={currentTab === tab.anchor ? 'page' : undefined}
							className={classNames(
								tabIdx === 0 ? 'rounded-l-lg' : '',
								tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
								'group relative min-w-0 flex-1 overflow-hidden bg-title-400 px-4 py-4 text-center text-sm font-medium text-title-200 hover:bg-title-300 focus:z-10',
								currentTab === tab.anchor ? 'bg-title-300' : ''
							)}
							onClick={() => handleTabClick(tab.anchor)}
						>
							<span>{tab.name}</span>
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
