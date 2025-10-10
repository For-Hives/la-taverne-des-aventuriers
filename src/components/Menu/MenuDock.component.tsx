'use client'

import {
	faBeer,
	faGlassWater,
	faMartiniGlass,
	faMartiniGlassCitrus,
	faMugHot,
	faUtensils,
	faWhiskeyGlass,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Ham } from 'lucide-react'

import { FloatingDock } from '@/components/Menu/FloatingDock.component'

const menuItems = [
	{
		href: '#cocktails',
		icon: <FontAwesomeIcon icon={faMartiniGlassCitrus} className="h-full w-full text-inherit -translate-x-[1px]" />,
		title: 'Cocktails',
	},
	{
		href: '#mocktails',
		icon: <FontAwesomeIcon icon={faGlassWater} className="h-full w-full text-inherit -translate-x-[1px]" />,
		title: 'Mocktails',
	},
	{
		href: '#shooters',
		icon: <FontAwesomeIcon icon={faWhiskeyGlass} className="h-full w-full text-inherit -translate-x-[1px]" />,
		title: 'Shooters',
	},
	{
		href: '#short-long-drinks',
		icon: <FontAwesomeIcon icon={faMartiniGlass} className="h-full w-full text-inherit -translate-x-[1px]" />,
		title: 'Short & Long Drinks',
	},
	{
		href: '#planches',
		icon: <Ham className="h-full w-full text-inherit -translate-x-[1px]" />,
		title: 'Planches',
	},
	{
		href: '#travelers',
		icon: <FontAwesomeIcon icon={faUtensils} className="h-full w-full text-inherit -translate-x-[1px]" />,
		title: 'Plaisirs Voyageur',
	},
	{
		href: '#beer-wine',
		icon: <FontAwesomeIcon icon={faBeer} className="h-full w-full text-inherit -translate-x-[1px]" />,
		title: 'Bières et Vins',
	},
	{
		href: '#softs-hot-drinks',
		icon: <FontAwesomeIcon icon={faMugHot} className="h-full w-full text-inherit -translate-x-[1px]" />,
		title: 'Softs & Boissons Chaudes',
	},
]

export default function MenuDock() {
	return <FloatingDock items={menuItems} className="z-9999" />
}
