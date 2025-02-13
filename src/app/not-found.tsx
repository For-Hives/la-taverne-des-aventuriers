'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Global/Navbar.component'
import MobileNavbar from '@/components/Global/NavbarMobile.component'
import RiveAnimation from '@/components/animation/RiveAnimation'
import { getNavBarData } from '@/app/actions/services/getNavData.service'

export default function Home() {
	const [dataNavbar, setDataNavbar] = useState(null)

	// Récupérer les données de la navbar au chargement du composant
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
		<div className='flex h-screen w-full flex-col items-center justify-center'>
			<Navbar navItems={dataNavbar} />
			<MobileNavbar navItems={dataNavbar} />
			{/* Animation Rive */}
			<RiveAnimation />
		</div>
	)
}
