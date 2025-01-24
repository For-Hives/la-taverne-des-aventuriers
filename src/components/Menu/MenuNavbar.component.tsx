import { useStore } from '@/stores/MenuNavbarStore'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { useEffect } from 'react'

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ')
}

export const tabs = [
	{ current: false, name: 'All' },
	{ current: false, name: 'Cocktails' },
	{ current: false, name: 'Mocktails' },
	{ current: true, name: 'Shooters' },
	{ current: false, name: 'Short / Long Drinks' },
	{ current: false, name: 'Bièrres et Vins' },
	{ current: false, name: 'Planche' },
	{ current: false, name: 'Softs et Boissons Chaudes' },
]

export default function MenuNavbar() {
	const setActiveCategory = useStore(state => state.setActiveCategory)
	const activeCategory = useStore(state => state.activeCategory)

	// Utiliser useEffect pour mettre à jour la catégorie après le rendu
	useEffect(() => {
		if (activeCategory !== 'All') {
			tabs.forEach(tab => {
				tab.current = tab.name === activeCategory
			})
		}
	}, [activeCategory])

	const handleTabClick = (category: string) => {
		setActiveCategory(category)
	}

	return (
		<div className='p-16'>
			<div className='grid grid-cols-1 md:hidden'>
				<select
					defaultValue={activeCategory}
					aria-label='Select a tab'
					className='col-start-1 row-start-1 w-full appearance-none rounded-md bg-title-400 py-2 pl-3 pr-8 text-base text-title-200 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600'
				>
					{tabs.map(tab => (
						<option key={tab.name}>{tab.name}</option>
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
							aria-current={tab.current ? 'page' : undefined}
							className={classNames(
								tabIdx === 0 ? 'rounded-l-lg' : '',
								tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
								'group relative min-w-0 flex-1 overflow-hidden bg-title-400 px-4 py-4 text-center text-sm font-medium text-title-200 hover:bg-title-300 focus:z-10',
								tab.current ? 'bg-title-300' : ''
							)}
							onClick={e => {
								e.preventDefault()
								handleTabClick(tab.name)
							}}
						>
							<span>{tab.name}</span>
							<span
								aria-hidden='true'
								className={classNames(
									tab.current ? 'bg-title-200' : 'bg-transparent',
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
