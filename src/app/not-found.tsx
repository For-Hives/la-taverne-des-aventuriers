'use client'

import { getNavBarData } from '@/app/actions/services/getNavData.service'
import RiveAnimation from '@/components/animation/RiveAnimation'
import Navbar from '@/components/Global/Navbar.component'
import MobileNavbar from '@/components/Global/NavbarMobile.component'
import { useState, useEffect } from 'react'

export default function Home() {
	const [dataNavbar, setDataNavbar] = useState(null)

	useEffect(() => {
		const fetchNavData = async () => {
			const data = await getNavBarData()
			setDataNavbar(data)
		}

		fetchNavData()
	}, [])

	if (!dataNavbar) {
		return <div>Loading...</div>
	}

	return (
		<div
			className='relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-cover bg-center'
			style={{ backgroundImage: "url('/assets/images/bg_notfound.png')" }}
		>
			<Navbar navItems={dataNavbar} />
			<MobileNavbar navItems={dataNavbar} />

			{/* Animation Rive */}
			<RiveAnimation />
		</div>
	)
}
