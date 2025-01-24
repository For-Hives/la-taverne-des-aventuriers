import { ChevronDownIcon } from '@heroicons/react/16/solid'

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ')
}

export const tabs = [
	{ current: false, href: '#', name: 'Tout' },
	{ current: false, href: '#', name: 'Cocktails' },
	{ current: false, href: '#', name: 'Mocktails' },
	{ current: true, href: '#', name: 'Shooters' },
	{ current: false, href: '#', name: 'Short / Long Drinks' },
	{ current: false, href: '#', name: 'Bièrres et Vins' },
	{ current: false, href: '#', name: 'Planche' },
	{ current: false, href: '#', name: 'Softs et Boissons Chaudes' },
]

export default function Example() {
	const tabFound = tabs.find(tab => tab.current)?.name

	return (
		<div className='p-16'>
			<div className='grid grid-cols-1 md:hidden'>
				{/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
				<select
					defaultValue={tabFound}
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
						<a
							key={tab.name}
							href={tab.href}
							aria-current={tab.current ? 'page' : undefined}
							className={classNames(
								tabIdx === 0 ? 'rounded-l-lg' : '',
								tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
								'group relative min-w-0 flex-1 overflow-hidden bg-title-400 px-4 py-4 text-center text-sm font-medium text-title-200 hover:bg-title-300 focus:z-10'
							)}
						>
							<span>{tab.name}</span>
							<span
								aria-hidden='true'
								className={classNames(
									tab.current ? 'bg-title-200' : 'bg-transparent',
									'absolute inset-x-0 bottom-0 h-0.5'
								)}
							/>
						</a>
					))}
				</nav>
			</div>
		</div>
	)
}
