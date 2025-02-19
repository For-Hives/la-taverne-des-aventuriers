'use client'

import { NavBarData } from '@/app/actions/services/getNavData.service'
import Image from 'next/image'
import Link from 'next/link'

interface NavbarProps {
	navItems: NavBarData
}

/**
 * Desktop Navigation Component
 */
export default function Navbar({ navItems }: NavbarProps) {
	return (
		<nav className='fixed top-2 z-50 flex w-full max-lg:hidden'>
			<div className='mx-auto flex w-full max-w-7xl items-center justify-evenly rounded bg-customWhite-100 px-4 py-3'>
				<ul className='flex items-center gap-16 space-x-6 font-obraletra text-sm text-customBrown-100'>
					{/* Home Logo Link - Always First */}
					<li>
						<Link href='/' aria-label='Home'>
							<Image
								src='/assets/images/LTDALogo.webp'
								alt='Website Logo'
								width={50}
								height={50}
								priority
							/>
						</Link>
					</li>

					{/* Dynamic Navigation Items */}
					{navItems.map(item => (
						<li key={item.id}>
							<Link href={item.url} className='hover:underline'>
								{item.label}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</nav>
	)
}
