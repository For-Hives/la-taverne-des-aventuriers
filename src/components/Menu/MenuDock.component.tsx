'use client'

import { FloatingDock } from '@/components/Menu/FloatingDock.component'
import {
	faBeer,
	faWhiskeyGlass,
	faGlassWater,
	faMartiniGlassCitrus,
	faMugHot,
	faBacon,
	faCheese,
	faMartiniGlass,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const menuItems = [
	{
		href: '#cocktails',
		icon: (
			<FontAwesomeIcon
				icon={faMartiniGlassCitrus}
				className='h-full w-full text-inherit'
			/>
		),
		title: 'Cocktails',
	},
	{
		href: '#mocktails',
		icon: (
			<FontAwesomeIcon
				icon={faGlassWater}
				className='h-full w-full text-inherit'
			/>
		),
		title: 'Mocktails',
	},
	{
		href: '#shooters',
		icon: (
			<FontAwesomeIcon
				icon={faWhiskeyGlass}
				className='h-3/4 w-full transform text-inherit md:translate-y-2'
			/>
		),
		title: 'Shooters',
	},
	{
		href: '#short-long-drinks',
		icon: (
			<FontAwesomeIcon
				icon={faMartiniGlass}
				className='h-full w-full text-inherit'
			/>
		),
		title: 'Short & Long Drinks',
	},
	{
		href: '#planches',
		icon: (
			<FontAwesomeIcon icon={faCheese} className='h-full w-full text-inherit' />
		),
		title: 'Planches',
	},
	{
		href: '#travelers',
		icon: (
			<FontAwesomeIcon icon={faBacon} className='h-full w-full text-inherit' />
		),
		title: 'Plaisirs Voyageur',
	},
	{
		href: '#beer-wine',
		icon: (
			<FontAwesomeIcon icon={faBeer} className='h-full w-full text-inherit' />
		),
		title: 'Bières et Vins',
	},
	{
		href: '#softs-hot-drinks',
		icon: (
			<FontAwesomeIcon icon={faMugHot} className='h-full w-full text-inherit' />
		),
		title: 'Softs & Boissons Chaudes',
	},
]

export default function MenuDock() {
	return <FloatingDock items={menuItems} className='z-[9999]' />
}
