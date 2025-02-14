import { useRive } from '@rive-app/react-canvas'
import { useEffect, useState } from 'react'

export default function RiveAnimation() {
	const [isMobile, setIsMobile] = useState(false)

	useEffect(() => {
		const mediaQuery = window.matchMedia('(max-width: 768px)')
		const handleChange = () => setIsMobile(mediaQuery.matches)

		handleChange()
		mediaQuery.addEventListener('change', handleChange)

		return () => mediaQuery.removeEventListener('change', handleChange)
	}, [])

	const { RiveComponent: RiveDesktopComponent } = useRive({
		automaticallyHandleEvents: true,
		autoplay: true,
		isTouchScrollEnabled: true,
		src: '/assets/animation/chevalier.riv',
		stateMachines: 'State Machine 1',


	})

	const { RiveComponent: RiveMobileComponent } = useRive({
		automaticallyHandleEvents: true,
		autoplay: true,
		isTouchScrollEnabled: true,
		src: '/assets/animation/chevaliermobile.riv',
		stateMachines: 'State Machine 1',
	})

	return <>{isMobile ? <RiveMobileComponent /> : <RiveDesktopComponent />}</>
}
